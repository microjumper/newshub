import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of, tap, throwError } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly baseUrl: string | undefined;
  private readonly getCode: string | undefined;
  private readonly searchCode: string | undefined;

  constructor(private httpClient: HttpClient) {
    /*
    if(typeof process !== 'undefined' && process !== null) {
      this.baseUrl = "https://newshubfunction.azurewebsites.net/api/articles";
      this.getCode = `?code=${process.env['GET_CODE']}`;
      this.searchCode = `?code=${process.env['SEARCH_CODE']}`;
    } else {
      this.baseUrl = "http://localhost:7071/api/articles";
      this.getCode = '';
      this.searchCode = '';
    }
    */

    this.baseUrl = "https://newshubfunction.azurewebsites.net/api/articles";
    this.getCode = `?code=${process.env['GET_CODE']}`;
    this.searchCode = `?code=${process.env['SEARCH_CODE']}`;
  }

  getPaginatedArticles(limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/all/${limit}/${offset}${this.getCode}`).pipe(
        tap(response => this.processArticles(response.articles))
      )
    }

    return throwError(() => new Error(`Invalid arguments: ${limit}, ${offset}`));
  }

  search(searchTerm: string, limit: number, pageNumber = 1): Observable<PaginatedResponse> {
    const offset = pageNumber - 1;

    if (limit > 0 && offset >= 0) {
      return this.httpClient.get<PaginatedResponse>(`${this.baseUrl}/search/${searchTerm}/${limit}/${offset}${this.searchCode}`).pipe(
        tap(response => this.processArticles(response.articles))
      )
    }

    return of({ totalRecords: 0, articles: [] });
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
