import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jeu-solo',
  templateUrl: './jeu-solo.component.html',
  styleUrls: ['./jeu-solo.component.css']
})
export class JeuSoloComponent implements OnInit {

  texte : number = 1;

  constructor() { }

  ngOnInit() {
  }

  changerTexte():void{
    this.texte++;
  }
}
