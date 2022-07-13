import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogData } from '../game/game.component';



@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  game: Game;
  gameId;
  inputVisible: boolean = false;
  firestore: any;
  route: any;
  newName: string = '';
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
    this.game = new Game();
  
  };

  images: string[] = [
    'woman1.png',
    'man1.png',
    'woman2.png',
    'man2.png',
    'woman3.png',
    'man3.png',
  ]

  // changeImg(change){
  //   this.game.playerImg[change.indexPlayer] = this.images[change.indexImg];
  //   console.log('change is:', change);
  //   console.log('path is:', this.images[change.indexImg]);
  //   console.log('firebase playerImg:', this.game.playerImg[change.indexPlayer]);
    
  // }

  
  showInput(){
    this.inputVisible = true;
  }

}
