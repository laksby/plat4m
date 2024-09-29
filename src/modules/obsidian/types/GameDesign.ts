import { GameMechanics } from './GameMechanics';
import { GameObject } from './GameObject';

export interface GameDesign {
  mechanics: GameMechanics[];
  objects: GameObject[];
}
