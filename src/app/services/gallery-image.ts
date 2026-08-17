import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiCollectionResponse } from '../models/strapi-response.model';
import { GalleryImage } from '../models/menu-item.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GalleryImageService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

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

        // Cloudinary / URL externe
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }

        // Strapi local
        return `${this.apiUrl}${imageUrl}`;
    }
}
