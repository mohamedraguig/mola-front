import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { RestaurantInfo } from '../../models/restaurant-info.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {

  restaurantInfo: RestaurantInfo | null = null;

  constructor(private readonly infoService: InfoService) { }

  ngOnInit(): void {
    this.infoService.loadRestaurantInfo().subscribe({
      next: response => {
        this.restaurantInfo = response.data;
      },
      error: error => {
        console.error('Erreur lors du chargement des infos restaurant', error);
      }
    });
  }

  getPhoneLink(): string {
    if (!this.restaurantInfo) {
      return '';
    }

    return 'tel:' + this.restaurantInfo.phone.replace(/\s/g, '');
  }

}
