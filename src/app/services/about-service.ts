import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { StrapiImage, StrapiResponse } from '../models/strapi-response.model';
import { AboutSection } from '../models/about.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.production';

@Injectable({
    providedIn: 'root'
})
export class AboutService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    loadAboutSection(): Observable<StrapiResponse<AboutSection>> {
        return this.http.get<StrapiResponse<AboutSection>>(
            `${this.apiUrl}/api/about?populate=*`
        );
    }


    getImageUrl(image: StrapiImage): string {
        if (!image) {
            return '/assets/images/mola_interior.webp';
        }

        const imageUrl =
            image.formats?.medium?.url ??
            image.formats?.small?.url ??
            image.url;

        // Cloudinary / URL externe
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }

        // Strapi local
        return `${this.apiUrl}${imageUrl}`;
    }
}
