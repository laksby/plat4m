const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const ts = require('typescript');
const vm = require('vm');

const moduleCache = new Map();

const modulesDir = path.resolve(__dirname, './src/modules');
const tsOptionsPath = path.resolve(__dirname, 'tsconfig.json');

const tsConfigFile = ts.readConfigFile(tsOptionsPath, ts.sys.readFile);
const tsConfigParseResult = ts.parseJsonConfigFileContent(tsConfigFile.config, ts.sys, path.dirname(tsOptionsPath));

try {
  run();
} catch (err) {
  console.error(err.message);
}

function run() {
  program.argument('<module_name>', 'Module name');
  program.parse();

  const [moduleName] = program.args;
  const modulePath = path.resolve(modulesDir, moduleName);

  if (!fs.existsSync(modulePath)) {
    throw new Error(`Module '${moduleName}' directory not found.`);
  }

  runTS(modulePath, './cli');
}

function runTS(modulePath, fileName) {
  const isLocalModule = fileName.startsWith('/') || fileName.startsWith('./') || fileName.startsWith('..');

  if (!isLocalModule) {
    return require(fileName);
  }

  const realPath = resolvePath(modulePath, fileName);

  if (moduleCache.has(realPath)) {
    return moduleCache.get(realPath);
  }

  const moduleCode = transpileTS(realPath);
  const script = new vm.Script(moduleCode, {
    filename: realPath,
  });

  const realPathDir = path.dirname(realPath);
  const sandbox = Object.assign({}, global, {
    process,
    console,
    require: name => runTS(realPathDir, name),
    module: {},
    exports: {},
    __dirname: realPathDir,
    __filename: realPath,
  });

  const context = vm.createContext(sandbox);

  moduleCache.set(realPath, sandbox.exports);
  script.runInContext(context);

  return sandbox.exports;
}

function resolvePath(modulePath, fileName) {
  const fullPath = path.resolve(modulePath, fileName);
  const extension = path.extname(fullPath);

  if (extension) {
    return fullPath;
  }

  const isDirectory = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();

  if (isDirectory) {
    return path.join(fullPath, 'index.ts');
  }

  return `${fullPath}.ts`;
}

function transpileTS(fileName) {
  if (!fs.existsSync(fileName)) {
    throw new Error(`Module '${fileName}' not found.`);
  }

  const sourceCode = fs.readFileSync(fileName, 'utf8');

  const { outputText, diagnostics } = ts.transpileModule(sourceCode, {
    compilerOptions: {
      ...tsConfigParseResult.options,
      module: ts.ModuleKind.CommonJS,
    },
    fileName,
  });

  if (diagnostics?.length) {
    const errorMessages = diagnostics.map(diagnostic =>
      diagnostic.messageText ? ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') : '',
    );

    throw new Error(`Module script failed. Errors: '${errorMessages}'`);
  }

  return outputText;
}
