import { RoutingService } from './../service/routing.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GiveupDialogComponent } from './giveup-dialog/giveup-dialog.component';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { GameService } from '../service/game.service';
import { BestWordsComponent } from './best-words/best-words.component';

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
     * Objet représentant le lien 'subscribe' avec la méthode getWords
     */
    private subscriptionGetBestWords;
    /**
     * Objet représentant le lien 'subscribe' avec la méthode getAnswer
     */
    private subscriptionGiveUp;
    /**
     * Constructeur des boutons du jeu
     * @param gameService - Service permettant de gérer les sockets avec le serveur
     * @param matDialog - Boite de dialogue d'abandon de la partie
     */
    constructor(
        private gameService: GameService,
        public matDialog: MatDialog,
        private routingService: RoutingService
    ) {}

    ngOnInit(): void {
        this.subscriptionGetBestWords = this.gameService
            .getWords()
            .subscribe(msg => {
                console.log(msg);
                let words: string[] = msg[0];
                let bestWords: Array<string> = new Array<string>();
                for (let i = 0; i < words.length; i++) {
                    bestWords.push(
                        words[i]['word'] +
                            ' = ' +
                            words[i]['score']['correctPlace'] +
                            ' , ' +
                            words[i]['score']['correctLetter'] +
                            '\n'
                    );
                }
                this.matDialog.open(BestWordsComponent, {
                    data: { words: bestWords },
                });
            });
        this.subscriptionGiveUp = this.gameService
            .getAnswer()
            .subscribe(msg => {
                this.routingService.changeViewToGameConfig();
                this.matDialog.open(AnswerDialogComponent, {
                    data: { answer: msg[0] },
                });
            });
    }

    ngOnDestroy() {
        this.subscriptionGetBestWords.unsubscribe();
        this.subscriptionGiveUp.unsubscribe();
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
        const dialogRef = this.matDialog.open(GiveupDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.gameService.askForAnswer();
            }
        });
    }
}
