import { GameService } from './../service/game.service';
import { RoutingService } from '../service/routing.service';
import { AppComponent } from '../app.component';
import { FormControl, Validators, FormGroup, AsyncValidator, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Player } from '../model/player/player';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dash-board-view',
    templateUrl: './dash-board-view.component.html',
    styleUrls: ['./dash-board-view.component.css'],
})
export class DashBoardViewComponent implements OnInit {
    constructor(
        private gameService: GameService,
        private routingService: RoutingService
    ) {}

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
    goToGameConfig(userName: string): void {
        this.gameService.setUserName(userName);
        this.routingService.changeViewToGameConfig();
    }

    goToGameConfig(userName: string): void {
        if(this.validateName(userName)){
            this.gameService.connectUser(userName);
            this.parent.setUserName(userName);
            this.parent.changeViewToGameConfig();
        }

        console.log("nameAlreadyUsed : "+this.nameAlreadyUsed);
    }

    validateName(userName): boolean{
        if(this.connectedPlayers){
            console.log("Connected players : "+this.connectedPlayers);
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
