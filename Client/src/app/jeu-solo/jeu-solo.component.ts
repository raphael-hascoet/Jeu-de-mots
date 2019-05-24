import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jeu-solo',
    templateUrl: './jeu-solo.component.html',
    styleUrls: ['./jeu-solo.component.css'],
    host: { '(document:keypress)': 'handleKeyboardEvent($event)' },
})
export class JeuSoloComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event);
    }
}
