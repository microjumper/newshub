import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of, tap, throwError } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly baseUrl: string = "https://newshubfunction.azurewebsites.net/api/articles";
  private readonly getCode = process.env['GET_CODE'];
  private readonly searchCode = process.env['SEARCH_CODE'];

  constructor(private httpClient: HttpClient) { }

  getPaginatedArticles(limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/get/${limit}/${offset}?code=${this.getCode}`).pipe(
        tap(response => this.processArticles(response.articles))
      )
    }

    return throwError(() => new Error(`Invalid arguments: ${limit}, ${offset}`));
  }

  search(searchTerm: string, limit: number, pageNumber = 1): Observable<Article[]> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<Article[]>(`${this.baseUrl}/search/${searchTerm}/${limit}/${offset}?code=${this.searchCode}`).pipe(
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
