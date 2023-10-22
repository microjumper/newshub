import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";

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
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    CardModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
