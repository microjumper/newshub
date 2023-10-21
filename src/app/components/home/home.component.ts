import {Component, OnInit} from '@angular/core';

import {NewsService} from "../../services/news/news.service";
import {Article} from "../../types/article.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[] | undefined;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getArticles().subscribe(
      articles => {
        this.articles = articles;
        console.log(articles);
      }
    );
  }
}
