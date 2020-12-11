import { Component } from '@angular/core';
import { Landmine } from './minesweeper/landmine';
import { Tile } from './minesweeper/tile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'minesweeper';
  landmine: Landmine;
  gameover: boolean = false;
  winner: boolean = false;
  constructor() {
    this.reset();
  }

  checkTile(tile: Tile) {
    const result = this.landmine.checkTile(tile);
    if (result === 'gameover') {
      // alert('Sorry!!! You Lost.');
      this.gameover = true;

    } else if (result === 'win') {
      this.winner = true
    }
  }

  mine(tile: Tile) {
    if (tile.status === 'flagMine') {
      tile.status = 'open';
    } else {
      tile.status = 'flagMine';
    }
  }

  reset() {
    this.landmine = new Landmine(10, 10);
    this.gameover = false;
    this.winner= false;
  }
}
