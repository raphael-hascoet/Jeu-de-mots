import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.css'],
})
export class GameCommandComponent implements OnInit {
    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.socketService.getWords().subscribe(msg => {
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
    }

    onShowWords() {
        this.socketService.askForWords();
    }
}
