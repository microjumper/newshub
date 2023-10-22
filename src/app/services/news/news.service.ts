import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of, tap, throwError } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getPaginatedArticles(limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`http://localhost:7071/api/articles/get/${limit}/${offset}`).pipe(
        tap(response => this.processArticles(response.articles))
      )
    }

    return throwError(() => new Error(`Invalid arguments: ${limit}, ${offset}`));
  }

  search(searchTerm: string, limit: number, pageNumber = 1): Observable<Article[]> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<Article[]>(`http://localhost:7071/api/articles/search/${searchTerm}/${limit}/${offset}`).pipe(
        tap(articles => this.processArticles(articles))
      )
    }

    return of([]);
  }

  private processArticles(articles: Article[]): Article[] {
    articles.forEach(a => a.urlToImage = this.checkImageUrl(a.urlToImage));

    return articles;
  }

  private checkImageUrl(url: string): string {
    if (!url || url.length === 0) {
      return 'assets/placeholder-image.png';
    }

    return url;
  }
}
