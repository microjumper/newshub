import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Observable, tap} from "rxjs";

import { Article } from "../../types/article.type";

import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(environment.getArticlesEndpoint).pipe(
      tap(articles => {
        articles.forEach(a => {
          if(!a.urlToImage || a.urlToImage.length === 0) {
            a.urlToImage = 'assets/placeholder-image.png';
          }
        })
      })
    );
  }
}
