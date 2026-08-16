import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiCollectionResponse } from '../models/strapi-response.model';
import { GalleryImage } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryImageService {
    
    private readonly apiUrl = 'http://localhost:1337';

    constructor(private http: HttpClient) {}

    getGalleryImages(): Observable<StrapiCollectionResponse<GalleryImage>> {
        return this.http.get<StrapiCollectionResponse<GalleryImage>>(
            `${this.apiUrl}/api/galleries?populate=*&sort=order:asc`
        );
    }

    getImageUrl(item: GalleryImage): string {
        if (!item.image) {
            return '/assets/images/image1.webp';
        }

        const imageUrl = 
         item.image.formats?.small?.url ??
         item.image.formats?.medium?.url ??
         item.image.url;

        return `${this.apiUrl}${imageUrl}`;
    }
}
