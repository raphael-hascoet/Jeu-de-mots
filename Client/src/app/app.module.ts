import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatButtonModule } from '@angular/material/button';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GameCommandComponent } from './game-command/game-command.component';
import { GameConfigurationViewComponent } from './game-configuration-view/game-configuration-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GiveupDialogComponent } from './game-command/giveup-dialog/giveup-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DashBoardViewComponent } from './dash-board-view/dash-board-view.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [AppComponent, GameCommandComponent, GameConfigurationViewComponent, GameViewComponent, GiveupDialogComponent, DashBoardViewComponent],
    entryComponents:[GiveupDialogComponent],
    imports: [
        BrowserModule,
        TextFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDialogModule,
        SocketIoModule.forRoot(config),
    ],
    exports: [
        TextFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
