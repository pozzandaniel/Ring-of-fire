import { Component, OnInit, Inject } from '@angular/core';
import { Game } from 'src/models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrComponent } from '../dialog-err/dialog-err.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
export interface DialogData {
  gameOver
};





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameOver = false;
  game: Game;
  gameId:string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
     public dialog: MatDialog) { }


  ngOnInit(): void {
    
    this.newGame();
    this.route.params.subscribe((params)=>{
      console.log(params['id']);
      this.gameId= params['id'];
      this
      .firestore
      .collection('games') 
      .doc(params['id'])
      .valueChanges()
      .subscribe((game: any)=>{
        console.log('Game updated: ', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.playerImages = game.playerImages;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
    
  }

  takeCard(){
    if(!this.game.pickCardAnimation && this.game.players.length > 0){
      this.game.currentCard = this.game.stack.pop()
      this.game.pickCardAnimation = true;
      console.log(this.game.currentCard);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log('current player is: ', this.game.currentPlayer)
      this.saveGame();
      
    } else {
      if(this.game.stack.length != 0 && !this.game.pickCardAnimation){
        this.openDialogErr();

      } else if(this.game.stack.length == 0 ) {
        this.gameOver = true;
        this.openDialogErr();
      }

      
    } 
    setTimeout(() => {
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();

    }, 1000);
  }

  newGame(){
    this.game = new Game();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      
    });

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        console.log('name is:',name);
        this.game.playerImages.push('standard.png');
        this.saveGame();
      }
    });
  }

  saveGame(){
    this
      .firestore
      .collection('games') 
      .doc(this.gameId)
      .update(this.game.toJson())
  }

  
  openDialogErr() {
    this.dialog.open(DialogErrComponent, {
      data: {
        gameOver: this.gameOver,
      },
    });
  }

  editPlayer(indexPlayer: number){
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change:string) => {
      if(change){
        if(change == 'DELETE'){
          this.game.playerImages.splice(indexPlayer, 1);
          this.game.players.splice(indexPlayer, 1);

        }else if(change.includes('.png')){
          this.game.playerImages[indexPlayer] = change;
          
        } else {
          this.game.players[indexPlayer] = change;
        }
        
        this.saveGame();
      }
  
    });
  }

  // dialogPlayer(playerId){
  //   const dialogRef = this.dialog.open(EditPlayerComponent, {
  //     data: {
  //       playerId: playerId,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((change:string) => {
  //       // this.game.playerImg[playerId] = change;
  //       // this.saveGame();
  //       console.log(change)
      
  //   });

    
  // }


}


// // @Component({
// //   selector: 'app-edit-player',
// //   templateUrl: './edit-player.component.html',
// // })
// export class DialogErrComponent {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }