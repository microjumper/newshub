import {Component, OnInit} from '@angular/core';

import {NewsService} from "../../services/news/news.service";
import {Article} from "../../types/article.type";
import {DataViewPageEvent} from "primeng/dataview";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly recordsPerPage: number = 12;

  first: number = 0;

  totalRecords!: number;
  articles!: Article[];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  onPage(event: DataViewPageEvent): void {  // event: { first: number, rows: number }
    const pageNumber = 1 + (event.first / this.recordsPerPage);
    this.loadData(pageNumber);
  }

  private loadData(pageNumber = 1): void {
    this.newsService.getPaginatedArticles(this.recordsPerPage, pageNumber).subscribe(
      response => {
        this.totalRecords = +response.totalRecords;
        this.articles = response.articles;
      }
    )
  }
}
