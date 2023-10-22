import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, tap, throwError } from "rxjs";

import { Article } from "../../types/article.type";
import { PaginatedResponse } from "../../types/paginated.type";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly getArticlesEndpoint : string = "https://newshubfunction.azurewebsites.net/api/articles?code=WaFF2-ScGyre7gMxSVpo-PyESbICsHldN9rRwR9WGH8JAzFuHS_gJA=="
  constructor(private httpClient: HttpClient) { }

  getPaginatedArticles(limit: number, offset: number): Observable<PaginatedResponse>
  {
    if (limit > 0 && offset > 0) {
      return this.httpClient.get<PaginatedResponse>(`http://localhost:7071/api/paginated/${limit}/${offset}`).pipe(
        tap(response => this.processArticles(response.articles))
      )
    }

    return throwError(() => new Error(`Invalid arguments: ${limit}, ${offset} must be > 0`));
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
