import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { JeuSoloComponent } from "./jeu-solo/jeu-solo.component";

import { TextFieldModule } from "@angular/cdk/text-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@NgModule({
  declarations: [AppComponent, JeuSoloComponent],
  imports: [
    BrowserModule,
    TextFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  exports: [
    TextFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
