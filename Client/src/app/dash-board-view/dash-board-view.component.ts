import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {
    @Input() parent: AppComponent;

    constructor() {}

    ngOnInit() {}

    goToGameConfig(userName : string): void {
        this.parent.setUserName(userName); 
        this.parent.changeViewToGameConfig();
    }
}
