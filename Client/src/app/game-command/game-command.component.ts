import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.css'],
})
export class GameCommandComponent implements OnInit {
    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.gameService.getWords().subscribe(msg => {
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

    onShowWords() {
        this.gameService.askForWords();
    }
}
