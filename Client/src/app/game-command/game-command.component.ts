import { RoutingService } from './../service/routing.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GiveupDialogComponent } from './giveup-dialog/giveup-dialog.component';
import { AppComponent } from '../app.component';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.css'],
})
/**
 * Classe représentant les commandes disponibles durant le jeu
 */
export class GameCommandComponent implements OnInit {
    /**
     * Constructeur des boutons du jeu
     * @param gameService - Service permettant de gérer les sockets avec le serveur
     * @param giveUpDialog - Boite de dialogue d'abandon de la partie
     */
    constructor(
        private gameService: GameService,
        public giveUpDialog: MatDialog,
        private routingService: RoutingService
    ) {}

    ngOnInit() {
        this.gameService.getWords().subscribe(msg => {
            console.log(msg);
            let msgToShow =
                'Les 5 mots ayant rapporté le plus de points sont : \n';
            let words: string[] = msg[0];
            for (let i = 0; i < words.length; i++) {
                msgToShow +=
                    words[i]['word'] +
                    ' = ' +
                    words[i]['score']['correctPlace'] +
                    ' , ' +
                    words[i]['score']['correctLetter'] +
                    '\n';
            }
            if (words.length == 0) {
                msgToShow = "Votre équipe n'a encore rentré aucun mot.";
            }
            alert(msgToShow);
        });
        this.gameService.getAnswer().subscribe(msg => {
            alert('Le mot à trouver était "' + msg[0] + '"');
        });
    }

    /**
     * Méthode permettant d'afficher les meilleurs mots proposés par les joueurs
     */
    onShowWords() {
        this.gameService.askForWords();
    }

    /**
     * Méthode permettant d'ouvrir une boîte de dialogue pour quitter la partie
     */
    onGiveUp() {
        const dialogRef = this.giveUpDialog.open(GiveupDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.routingService.changeViewToGameConfig();
                this.gameService.askForAnswer();
            }
        });
    }
}
