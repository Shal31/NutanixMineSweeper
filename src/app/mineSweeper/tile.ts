export class Tile {
  status: 'open' | 'clear' | 'flagMine' = 'open';
  mine = false;
  proximityMines = 0;

  constructor(public row: number, public column: number) {}
}
