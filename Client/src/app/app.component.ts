import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jeu de Mots';
  componentToDisplay:string = "game-config"; 

  displayJeuSolo(): boolean{
    return this.componentToDisplay=="jeu-solo";
  }

  changerComposant():void{
    this.componentToDisplay = "autre";
  }

  displayGameConfig() : boolean {
    return this.componentToDisplay == "game-config";
  }
}
