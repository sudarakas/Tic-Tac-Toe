import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //board squares array
  squares: any[]
  //track the player
  xIsNext: boolean;
  //winner
  winner: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  //start a new game
  newGame() {
    //add 9 null values to the square array 
    this.squares = Array(9).fill(null);
    //make the winner null at the start
    this.winner = null;
    //make the first player as X
    this.xIsNext = true;
  }

  //get the player
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  //update the game movements
  updateMove(id: number) {
    if (!this.squares[id]) {
      //update the squre value
      this.squares.splice(id, 1, this.player);
      //switch the player
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }
}
