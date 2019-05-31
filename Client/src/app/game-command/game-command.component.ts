import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { MatDialog } from '@angular/material';
import { GiveupDialogComponent } from './giveup-dialog/giveup-dialog.component';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.css'],
})
/**
 * Classe représentant les commandes disponibles durant le jeu
 */
export class GameCommandComponent implements OnInit {
    constructor(
        private socketService: SocketService,
        public giveUpDialog: MatDialog
    ) {}

    ngOnInit() {
        this.socketService.getWords().subscribe(msg => {
            console.log(msg);
            let msgToShow =
                'Les 5 mots ayant rapporté le plus de points sont : \n';
            let words: string[] = msg[0];
            for (let i = 0; i < words.length; i++) {
                msgToShow +=
                    words[i]['word'] + ' = ' + words[i]['score'] + '\n';
            }
            if (words.length == 0) {
                msgToShow = "Votre équipe n'a encore rentré aucun mot.";
            }
            alert(msgToShow);
        });
    }

    /**
     * Méthode permettant d'afficher les meilleurs mots proposés par les joueurs
     */
    onShowWords() {
        this.socketService.askForWords();
    }

    /**
     * Méthode permettant d'ouvrir une boîte de dialogue pour quitter la partie
     */
    onGiveUp() {
        const dialogRef = this.giveUpDialog.open(GiveupDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log('$result');
        });
    }
}
