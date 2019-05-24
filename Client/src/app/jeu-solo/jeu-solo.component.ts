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
        this.socketService.getMessage().subscribe(msg => {
            console.log(msg);
        });
        this.sendMsg(this.msg);
    }

    sendMsg(msg) {
        console.log('sdsd', msg);
        this.socketService.sendMessage(msg);
    }

    @ViewChild('box') input: ElementRef;

    value = '';
    enterValue(value: string) {
        this.value = value;
        this.input.nativeElement.value = '';
    }
}
