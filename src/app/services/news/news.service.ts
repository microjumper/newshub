import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Observable, tap} from "rxjs";

import { Article } from "../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly getArticlesEndpoint : string = "https://newshubfunction.azurewebsites.net/api/articles?code=WaFF2-ScGyre7gMxSVpo-PyESbICsHldN9rRwR9WGH8JAzFuHS_gJA=="
  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.getArticlesEndpoint).pipe(
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
