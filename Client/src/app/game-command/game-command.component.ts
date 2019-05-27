import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

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
            .subscribe((msg: Array<string /*, number*/>) => {
                console.log('getwords trouvé');
                alert(msg.toString());
            });
    }

    onShowWords() {
        this.socketService.askForWords();
    }
}
