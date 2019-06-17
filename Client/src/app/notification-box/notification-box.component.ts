import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-notification-box',
    templateUrl: './notification-box.component.html',
    styleUrls: ['./notification-box.component.css'],
})
export class NotificationBoxComponent implements OnInit {
    /**
     * Notifications reçues par les joueurs
     */
    private notifications: Array<string>;
    /**
     * Lien subscribe avec la méthode getNotification
     */
    private subscribeNotif;
    constructor(private gameService: GameService) {
        this.notifications = new Array<string>();
    }

    ngOnInit() {
        this.subscribeNotif = this.gameService
            .getNotification()
            .subscribe((msg: string) => {
                this.notifications.push(msg);
            });
    }

    ngOnDestroy() {
        this.subscribeNotif.unsubscribe();
    }
}
