import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameService } from '../service/game.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Player } from '../model/player/player';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {
    @Input() parent: AppComponent;

    hostIsConnected: boolean;
    nameAlreadyUsed: boolean = false;

    connectedPlayers: Player[];

    nameFormControl: FormControl = new FormControl('', [Validators.required]);

    buttonText : string;

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.gameService
            .getHostIsConnected()
            .subscribe(hostIsConnected => {
                if(hostIsConnected){
                    this.buttonText = "Rejoindre la partie";
                }else{
                    this.buttonText = "Créer une partie";
                }
            });

        this.gameService.getConnectedPlayers().subscribe(players => this.connectedPlayers=players);
    }

    goToGameConfig(userName: string): void {
        if(this.validateName(userName)){
            this.gameService.connectUser(userName);
            this.parent.setUserName(userName);
            this.parent.changeViewToGameConfig();
        }
    }

    validateName(userName): boolean{
        if(this.connectedPlayers){
            console.log(this.connectedPlayers);
            for(let player of this.connectedPlayers){
                if(player.name.localeCompare(userName)==0){
                    this.nameAlreadyUsed=true;
                    return false;
                }
            }
        }
       
        return true;
    }
}
