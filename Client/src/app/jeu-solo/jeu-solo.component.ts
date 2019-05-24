import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
    selector: 'app-jeu-solo',
    templateUrl: './jeu-solo.component.html',
    styleUrls: ['./jeu-solo.component.css'],
})
export class JeuSoloComponent implements OnInit {
    title = 'app';
    incomingmsg = [];
    msg = 'First Protocol';
    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.socketService.getScore().subscribe(msg => {
            console.log(msg);
        });
        //this.sendProposition(this.msg);
    }

    sendProposition(proposition) {
        console.log('sdsd', proposition);
        this.socketService.sendProposition(proposition);
    }

    @ViewChild('box') input: ElementRef;

    value = '';
    enterValue(value: string) {
        this.value = value;
        this.input.nativeElement.value = '';
        this.sendProposition(value);
    }
}
