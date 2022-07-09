import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'app-start-screen',
  animations: [
    trigger('fadeInTop', [
      transition(':enter', [
       style({opacity: 0, transform: 'translateY(-100%)'}),
       animate('1s 1s ease-in', style({opacity:1, transform: 'translateY(0)'}))
      ])
    ]),

    trigger('fadeInBottom', [
      transition(':enter', [
        style({opacity:0, transform: 'translateY(100%)'}),
        animate('1s 3s ease-in', style({opacity:1, transform: 'translateY(0)'}))
      ])
    ]),

    trigger('drawBorder', [
      state('border', style({borderTop: '4px solid rgb(255,215,0)', borderRight: '4px solid rgb(255,215,0)', borderBottom: '4px solid rgb(255,215,0)', borderLeft: '4px solid rgb(255,215,0)'})),

      state('no-border', style({borderTop: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '4px solid trasnparent', borderLeft: '4px solid transparent'})),

      transition('no-border => border', animate('0.5s ease-in', keyframes([
        style({borderTop: '4px solid 	rgb(255,215,0)', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid 	rgb(255,215,0)', borderRight: '4px solid rgb(255,215,0)', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid 	rgb(255,215,0)', borderRight: '4px solid rgb(255,215,0)', borderBottom: '4px solid rgb(255,215,0)', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid 	rgb(255,215,0)', borderRight: '4px solid rgb(255,215,0)', borderBottom: '4px solid rgb(255,215,0)', borderLeft: '4px solid rgb(255,215,0)'}),
      ]))),

      transition('border => no-border', animate('0.5s ease-in', keyframes([
        style({borderTop: '4px solid	rgb(255,215,0)', borderRight: '4px solid	rgb(255,215,0)', borderBottom: '4px solid	rgb(255,215,0)', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid	rgb(255,215,0)', borderRight: '4px solid	rgb(255,215,0)', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid	rgb(255,215,0)', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent'}),
        style({borderTop: '4px solid	transparent', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent'}),
        // style({border: '4px solid transparent'})
      ]))),
    ])
  ],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  isHovered = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame(){
    this.router.navigateByUrl('/game');
  }

  toggle(){
    this.isHovered = !this.isHovered;
  }
}
