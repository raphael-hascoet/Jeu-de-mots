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
import { GameStatsViewComponent } from './game-stats-view/game-stats-view.component';
import { HighchartsChartComponent } from 'highcharts-angular';
import { GiveupDialogComponent } from './game-command/giveup-dialog/giveup-dialog.component';
import { AnswerDialogComponent } from './game-command/answer-dialog/answer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashBoardViewComponent } from './dash-board-view/dash-board-view.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { PlayersListComponent } from './players-list/players-list.component';
import { HostDisconnectedDialogComponent } from './host-disconnected-dialog/host-disconnected-dialog.component';
import { BestWordsComponent } from './game-command/best-words/best-words.component';
import { StatsCommandComponent } from './stats-command/stats-command.component';
import { NotificationBoxComponent } from './notification-box/notification-box.component';
import { WinDialogComponent } from './game-view/win-dialog/win-dialog.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

const env = environment;
console.log(env);

const config: SocketIoConfig = { url: env['serverUrl'], options: {} };

@NgModule({
    declarations: [
        AppComponent,
        GameCommandComponent,
        GameConfigurationViewComponent,
        GameViewComponent,
        GameStatsViewComponent,
        HighchartsChartComponent,
        GiveupDialogComponent,
        DashBoardViewComponent,
        PlayersListComponent,
        HostDisconnectedDialogComponent,
        AnswerDialogComponent,
        BestWordsComponent,
        StatsCommandComponent,
        NotificationBoxComponent,
        WinDialogComponent,
    ],
    entryComponents: [
        GiveupDialogComponent,
        AnswerDialogComponent,
        BestWordsComponent,
        HostDisconnectedDialogComponent,
        WinDialogComponent,
    ],
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
        AppRoutingModule,
        ScrollDispatchModule,
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
        MatDialogModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
