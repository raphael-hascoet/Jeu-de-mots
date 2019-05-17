import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jeu de Mots';
  componentToDisplay:string = "jeu-solo"; 

  displayJeuSolo(): boolean{
    return this.componentToDisplay=="jeu-solo";
  }

  changerComposant():void{
    this.componentToDisplay = "autre";
  }
}
