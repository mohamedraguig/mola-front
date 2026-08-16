import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { RestaurantInfo } from '../../models/restaurant-info.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  restaurantInfo: RestaurantInfo | null = null;

  constructor(private readonly infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.loadRestaurantInfo().subscribe({
      next: response => {
        this.restaurantInfo = response.data;
      },
      error: error => {
        console.error('Une erreur lors du chargement des infos restaurant', error);
      }
    });
  }

  getPhoneLink(): string {
    if (!this.restaurantInfo) {
      return '';
    }

    return 'tel:' + this.restaurantInfo.phone.replace(/\s/g, '');
  }

  getAddressLines(): string[] {
  if (!this.restaurantInfo?.address) {
    return [];
  }

  const parts = this.restaurantInfo.address.split(',');

  return [
    parts[0]?.trim() ?? '',
    parts.slice(1).join(',').trim()
  ];
}

}
