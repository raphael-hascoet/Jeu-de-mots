import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JeuSoloComponent } from './jeu-solo/jeu-solo.component';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatButtonModule } from '@angular/material/button';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GameConfigurationViewComponent } from './game-configuration-view/game-configuration-view.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [AppComponent, JeuSoloComponent, GameConfigurationViewComponent],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
