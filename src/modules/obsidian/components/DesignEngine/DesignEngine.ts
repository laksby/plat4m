import { readFile } from 'fs/promises';
import { GameDesign, GameElement } from '../../types';
import { relative } from 'path';

export class DesignEngine {
  public async parse(designRootPath: string, paths: string[]): Promise<GameDesign> {
    const files = await Promise.all(paths.map(path => readFile(path, 'utf8')));
    const coreElements: GameElement[] = [];
    const uiElements: GameElement[] = [];
    const worldElements: GameElement[] = [];
    const indexElements: GameElement[] = [];

    paths.forEach(path => {
      const relativePath = relative(designRootPath, path);
      const [category, ...rest] = relativePath.split('/');
      const id = rest.join(' / ');

      switch (category) {
        case 'Core':
          coreElements.push({
            id,
          });
          break;
        case 'UI':
          uiElements.push({
            id,
          });
          break;
        case 'World':
          worldElements.push({
            id,
          });
          break;
        case 'Index':
          indexElements.push({
            id,
          });
          break;
      }
    });

    return {
      coreElements,
      uiElements,
      worldElements,
      indexElements,
    };
  }
}
