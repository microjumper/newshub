import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { KeyFilterModule } from "primeng/keyfilter";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    CardModule,
    DataViewModule,
    ReactiveFormsModule,
    KeyFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
