import { readFile } from 'fs/promises';
import { GameDesign, GameMechanics, GameObject } from '../../types';
import { relative } from 'path';

export class DesignEngine {
  public async parse(designRootPath: string, paths: string[]): Promise<GameDesign> {
    const files = await Promise.all(paths.map(path => readFile(path, 'utf8')));
    const mechanics: GameMechanics[] = [];
    const objects: GameObject[] = [];

    paths.forEach(path => {
      const relativePath = relative(designRootPath, path);
      const [category, ...rest] = relativePath.split('/');
      const id = rest.join('.');

      switch (category) {
        case 'Mechanics':
          mechanics.push({
            id,
          });
          break;
        case 'Objects':
          objects.push({
            id,
          });
          break;
      }
    });

    return {
      mechanics,
      objects,
    };
  }
}
