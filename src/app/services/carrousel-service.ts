import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrouselItem } from '../models/carrousel.model';
import { StrapiCollectionResponse, StrapiImage } from '../models/strapi-response.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarrouselService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    loadCarrouselItems(): Observable<StrapiCollectionResponse<CarrouselItem>> {
        return this.http.get<StrapiCollectionResponse<CarrouselItem>>(
            `${this.apiUrl}/api/carrousels?populate=*&sort=order:asc`
        );
    }

    getImageUrl(item: StrapiImage | null): string {
        if (!item) {
            return '/assets/images/banner1.webp';
        }

        const imageUrl =
            item.formats?.large?.url ??
            item.formats?.medium?.url ??
            item.url;

        // Cloudinary / URL externe
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }

        // Strapi local
        return `${this.apiUrl}${imageUrl}`;
    }
}
