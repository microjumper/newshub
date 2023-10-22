import {Article} from "./article.type";

export interface PaginatedResponse {
  totalRecords: string;
  articles: Article[];
}
