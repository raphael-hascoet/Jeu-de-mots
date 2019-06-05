import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { SocketService } from '../service/socket.service';

@Component({
    selector: 'app-game-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
    @Input() parent: AppComponent;

    title = 'app';
    incomingmsg = [];
    msg = 'First Protocol';
    @ViewChild('box') input: ElementRef;

    @ViewChild('response') response: ElementRef;
    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.socketService.getScore().subscribe(msg => {
            this.response.nativeElement.value =
                msg[0] +
                ' : ' +
                msg[1] +
                ' , ' +
                msg[2] +
                '\n' +
                this.response.nativeElement.value;
        });

        this.socketService.hasWon().subscribe(msg => {
            this.response.nativeElement.value =
                'Gagné ! ' + '\n' + this.response.nativeElement.value;
            this.changeViewToGameStats();
        });
    }

    sendProposition(proposition) {
        this.socketService.sendProposition(proposition);
    }

    value = '';
    enterValue(value: string) {
        this.value = value;
        this.input.nativeElement.value = '';
        //Check pour les string vide
        if (value.replace(/\s/g, '').length != 0) {
            this.sendProposition(value);
        }
    }

    changeViewToGameStats() {
        this.parent.changeViewToGameStats();
    }
}
