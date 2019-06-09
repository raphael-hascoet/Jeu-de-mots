import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    
    title = 'Jeu de Mots';
    componentToDisplay: string = 'dash-board';
    userName = "Inconnu";

    /**
     * Méthode indiquant d'afficher la vue de la partie
     */
    changeViewToGame(): void {
        this.componentToDisplay = 'game';
    }

    displayDashBoard(): boolean {
        return this.componentToDisplay == 'dash-board';
    }

    /**
     * Méthode retournant un Booléan indiquant s'il faut afficher la vue de la partie
     */
    displayGame(): boolean {
        return this.componentToDisplay == 'game';
    }

    /**
     * Méthode indiquant d'afficher la vue de configuration de partie
     */
    changeViewToGameConfig(): void {
        this.componentToDisplay = 'game-config';
    }

    /**
     * Méthode retournant un Booléan indiquant s'il faut afficher la vue de configuration de la partie
     */
    displayGameConfig(): boolean {
        return this.componentToDisplay == 'game-config';
    }

    /**
     * Méthode récupérent le composant app pour le transmettre aux autres vues
     */
    getAppComponent(): AppComponent {
        return this;
    }

    setUserName(userName: string): void{
        this.userName = userName;
    }

    getUserName(): string {
        return this.userName;
    }
}
