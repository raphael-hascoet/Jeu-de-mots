import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import TsMap from 'ts-map';

@Component({
    selector: 'app-game-command',
    templateUrl: './game-command.component.html',
    styleUrls: ['./game-command.component.css'],
})
export class GameCommandComponent implements OnInit {
    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.socketService
            .getWords()
            .subscribe((msg: TsMap<string, number>) => {
                console.log('getwords trouvé');
                let words = '';
                console.log('---foreach-----');
                /*msg[0].forEach((key, value) => {
                    console.log('---------' + key + '=' + value);
                });*/
                let keys = msg[0]['keyStore'];
                let value = msg[0]['valueStore'];
                for (let i = 0; i < msg[0]['valueStore'].length; i++) {
                    words += keys[i] + ' = ' + value[i] + '\n';
                }
                alert(words);
            });
    }

    onShowWords() {
        this.socketService.askForWords();
    }
}
