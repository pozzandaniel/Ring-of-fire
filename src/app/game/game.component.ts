import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string;
  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  takeCard(){
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop()
      this.pickCardAnimation = true;
      console.log(this.currentCard);

    }

    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);

    }, 1000);
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
  }

}
