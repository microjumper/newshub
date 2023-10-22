import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { DataViewPageEvent } from "primeng/dataview";

import { debounceTime, distinctUntilChanged, filter, map, startWith, Subscription } from "rxjs";

import { NewsService } from "../../services/news/news.service";
import { Article } from "../../types/article.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  readonly alphanumericWithSpace: RegExp = /[\da-zA-Z\s]/;

  readonly recordsPerPage: number = 12;

  first: number = 0;
  totalRecords!: number;
  articles!: Article[];

  searchForm: FormGroup;

  private subscription: Subscription | undefined;

  constructor(private newsService: NewsService) {
    this.searchForm = new FormGroup({
      search: new FormControl<string>('')
    });
  }

  ngOnInit(): void {
    this.subscription = this.searchForm.get('search')?.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map(searchTerm => searchTerm.trim()),
      distinctUntilChanged(),
      filter(searchTerm => searchTerm.length >= 3 || searchTerm.length === 0),
    ).subscribe((searchTerm: string) => {
      this.loadData()
    });
  }

  onPage(event: DataViewPageEvent): void {  // event: { first: number, rows: number }
    const pageNumber = 1 + (event.first / this.recordsPerPage);
    this.loadData(pageNumber);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadData(pageNumber = 1): void {
    const searchTerm = this.searchForm.get('search')?.value;

    if(searchTerm.length >= 3) {
      this.search(searchTerm, pageNumber);
    }

    if(searchTerm.length === 0) {
      this.getAll(pageNumber)
    }
  }

  private getAll(pageNumber = 1): void {
    this.newsService.getPaginatedArticles(this.recordsPerPage, pageNumber).subscribe(
      response => {
        this.totalRecords = +response.totalRecords;
        this.articles = response.articles;
      }
    );
  }

  private search(searchTerm: string, pageNumber = 1): void {
    this.newsService.search(searchTerm, this.recordsPerPage, pageNumber).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.totalRecords = articles.length;
      },
      error: () => {
        this.articles = [];
        this.totalRecords = 0;
      }
    });
  }
}
