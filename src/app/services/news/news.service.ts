import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getTopHeadlines(): Observable<any> {
    return this.httpClient.get('/assets/mocks/news.json')
  }
}
