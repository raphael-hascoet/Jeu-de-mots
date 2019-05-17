import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JeuSoloComponent } from './jeu-solo/jeu-solo.component';

@NgModule({
  declarations: [
    AppComponent,
    JeuSoloComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
