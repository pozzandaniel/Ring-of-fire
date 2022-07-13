import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../game/game.component';


@Component({
  selector: 'app-dialog-err',
  templateUrl: './dialog-err.component.html',
  styleUrls: ['./dialog-err.component.scss']
})
export class DialogErrComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  

  ngOnInit(): void {
  }

}
