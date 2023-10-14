import {Component, OnInit} from '@angular/core';

import {NewsService} from "../../services/news/news.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe(
      response => console.log(response)
    );
  }
}
