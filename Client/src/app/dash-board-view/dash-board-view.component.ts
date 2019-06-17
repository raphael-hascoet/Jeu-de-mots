import { GameService } from './../service/game.service';
import { RoutingService } from '../service/routing.service';
import { FormControl, Validators} from '@angular/forms';
import { Player } from '../model/player/player';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {


    hostIsConnected: boolean;
    nameAlreadyUsed: boolean = false;
    gameIsLaunched: boolean = false;

    connectedPlayers: Player[];

    nameFormControl: FormControl = new FormControl('', [Validators.required]);

    buttonText : string;

    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}

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

        this.gameService.getGameIsLaunched().subscribe(gameIsLaunched => {
            if(gameIsLaunched){
                this.buttonText = "Partie en cours...";
                this.gameIsLaunched = true;
            }else{
                this.gameIsLaunched = false;
            }
        });

        this.gameService.getConnectedPlayers().subscribe(players => this.connectedPlayers=players);

    }

    goToGameConfig(userName: string): void {
        if(this.validateName(userName)){
            this.gameService.connectUser(userName);
            this.gameService.setUserName(userName);
            this.routingService.changeViewToGameConfig();
        }
    }

    validateName(userName): boolean{
        if(this.connectedPlayers){
            for(let player of this.connectedPlayers){
                if(player.name.localeCompare(userName)==0){
                    this.nameAlreadyUsed=true;
                    return false;
                }
            }
        }
       
        this.nameAlreadyUsed=false;
        return true;
    }
}
