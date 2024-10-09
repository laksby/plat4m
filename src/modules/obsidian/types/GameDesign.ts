import { GameElement } from './GameElement';

export interface GameDesign {
  coreElements: GameElement[];
  uiElements: GameElement[];
  worldElements: GameElement[];
  indexElements: GameElement[];
}
