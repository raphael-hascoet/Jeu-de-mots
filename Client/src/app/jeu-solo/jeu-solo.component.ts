import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
@Component({
    selector: 'app-jeu-solo',
    templateUrl: './jeu-solo.component.html',
    styleUrls: ['./jeu-solo.component.css'],
})
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

export class JeuSoloComponent implements OnInit {
    socket: SocketIOClient.Socket;

    constructor() {}

    ngOnInit() {}

    @ViewChild('box') input: ElementRef;

    value = '';
    enterValue(value: string) {
        this.value = value;
        this.input.nativeElement.value = '';
    }
}
