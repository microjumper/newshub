import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {map, Observable} from "rxjs";

import {Article} from "../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getTopHeadlines(): Observable<Article[]> {
    return this.httpClient.get('/assets/mocks/news.json').pipe(
      map((response: any) => response.articles.map((r: any) => this.toArticle(r)))
    )
  }

  private toArticle(raw: any): Article {
    return {
      author: raw.author,
      content: raw.content,
      description: raw.description,
      title: raw.title,
      urlToImage: raw.urlToImage,
      publishedAt: raw.publishedAt
    }
  }
}
