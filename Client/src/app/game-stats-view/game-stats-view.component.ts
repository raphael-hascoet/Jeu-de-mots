import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-game-stats-view',
    templateUrl: './game-stats-view.component.html',
    styleUrls: ['./game-stats-view.component.css'],
})
export class GameStatsViewComponent implements OnInit {
    @Input() parent: AppComponent;
    constructor() {}

    ngOnInit() {}
}
