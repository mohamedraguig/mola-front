import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantInfo } from '../models/restaurant-info.model';
import { StrapiResponse } from '../models/strapi-response.model';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    private readonly apiUrl = "http://localhost:1337";

    constructor(private http: HttpClient) {}

    loadRestaurantInfo(): Observable<StrapiResponse<RestaurantInfo>> {
        return this.http.get<StrapiResponse<RestaurantInfo>>(
            `${this.apiUrl}/api/restaurant-info?populate[openingDays][populate]=*`
        );
    }
}
