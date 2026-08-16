import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StrapiCollectionResponse } from '../models/strapi-response.model';
import { Category, MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<StrapiCollectionResponse<MenuItem>> {
    return this.http.get<StrapiCollectionResponse<MenuItem>>(
      `${this.apiUrl}/api/menu-items?populate=*&sort=order:asc`
    );
  }

  getCategories(): Observable<StrapiCollectionResponse<Category>> {
    return this.http.get<StrapiCollectionResponse<Category>>(
        `${this.apiUrl}/api/categories?sort=order:asc`
    );
  }

  getImageUrl(item: MenuItem): string {
    if (!item.image) {
      return '/assets/images/placeholder-food.webp';
    }

    const imageUrl =
    item.image.formats?.thumbnail?.url ??
    item.image.formats?.small?.url ??
    item.image.url;

    return `${this.apiUrl}${imageUrl}`;
  }
}
