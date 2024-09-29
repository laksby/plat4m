import { existsSync, statSync } from 'fs';
import glob from 'glob';
import { homedir } from 'os';
import { join, resolve } from 'path';
import { promisify } from 'util';
import { DesignEngine } from './components/DesignEngine';

const globPromise = promisify(glob);

run().catch(err => {
  console.error(err.message);
});

async function run() {
  const vaultPath = process.env.OBSIDIAN_PATH;

  if (!vaultPath) {
    throw new Error('Obsidian vault path not specified.');
  }

  const absoluteVaultPath = vaultPath.startsWith('~') ? join(homedir(), vaultPath.slice(1)) : vaultPath;

  if (!existsSync(absoluteVaultPath)) {
    throw new Error(`Obsidian vault not exists at path '${absoluteVaultPath}'`);
  }

  const designRootPath = resolve(absoluteVaultPath, 'Design');

  if (!existsSync(designRootPath)) {
    throw new Error(`Obsidian project missing design root folder '${designRootPath}'`);
  }

  const matches = await globPromise(join(designRootPath, '**/*'));
  const designNotesPaths = matches.filter(match => statSync(match).isFile());

  const designEngine = new DesignEngine();
  const gameDesign = await designEngine.parse(designRootPath, designNotesPaths);

  printHeader(0, 'Game Design');

  printHeader(1, 'Game Mechanics', gameDesign.mechanics.length);
  gameDesign.mechanics.forEach(mechanics => {
    print(2, `${mechanics.id}`);
  });

  printHeader(1, 'Game Objects', gameDesign.objects.length);
  gameDesign.objects.forEach(object => {
    print(2, `${object.id}`);
  });
}

function printHeader(indent: number, message: string, counter: number | false = false) {
  print(indent, `[${message}${counter === false ? '' : ` | ${counter}`}]`);
}

function print(indent: number, message: string) {
  const prefix = ' '.repeat(indent * 2);
  console.log(`${prefix}${message}`);
}

// TODO: Analyze design folders and files to gather all information
// Implement validation
// Print stats and errors
