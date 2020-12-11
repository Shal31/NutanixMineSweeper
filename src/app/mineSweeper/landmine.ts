import { Tile } from './tile';
 
const nearbyMines = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class Landmine {
  tiles: Tile[][] = [];

  private remainingTiles = 0;
  private mineCount = 0;

  constructor(size: number, mines: number) {
    for (let y = 0; y < size; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < size; x++) {
        this.tiles[y][x] = new Tile(y, x);
      }
    }

    // Assign mines
    for (let i = 0; i < mines; i++) {
      this.getRandomTile().mine = true;
    }

    // Count mines

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let adjacentMines = 0;
        for (const peer of nearbyMines) {
          if (
            this.tiles[y + peer[0]] &&
            this.tiles[y + peer[0]][x + peer[1]] &&
            this.tiles[y + peer[0]][x + peer[1]].mine
          ) {
            adjacentMines++;
          }
        }
        this.tiles[y][x].proximityMines = adjacentMines;

        if (this.tiles[y][x].mine) {
          this.mineCount++;
        }
      }
    }
    this.remainingTiles = size * size - this.mineCount;
  }

  getRandomTile(): Tile {
    const y = Math.floor(Math.random() * this.tiles.length);
    const x = Math.floor(Math.random() * this.tiles[y].length);
    return this.tiles[y][x];
  }

  checkTile(Tile: Tile): 'gameover' | 'win' | null {
    if (Tile.status !== 'open') {
      return;
    } else if (Tile.mine) {
      this.revealAll();
      return 'gameover';
    } else {
      Tile.status = 'clear';

      // Empty Tile, let's clear the whole block.
      if(Tile.proximityMines === 0) {
        for(const singleMine of nearbyMines) {
          if (
            this.tiles[Tile.row + singleMine[0]] &&
            this.tiles[Tile.row + singleMine[0]][Tile.column + singleMine[1]]
          ) {
            this.checkTile(this.tiles[Tile.row + singleMine[0]][Tile.column + singleMine[1]]);
          }
        }
      }


      if (this.remainingTiles-- <= 1) {
        return 'win';
      }
      return;
    }
  }
  revealAll() {
    for (const row of this.tiles) {
      for (const tile of row) {
        if (tile.status === 'open') {
          tile.status = 'clear';
        }
      }
    }
  }
}
