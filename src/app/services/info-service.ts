import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurant-info.model';
import { StrapiResponse } from '../models/strapi-response.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    loadRestaurantInfo(): Observable<StrapiResponse<RestaurantInfo>> {
        return this.http.get<StrapiResponse<RestaurantInfo>>(
            `${this.apiUrl}/api/restaurant-info?populate[openingDays][populate]=*`
        );
    }
}
