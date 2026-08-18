import { Component, OnInit, signal } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { RestaurantInfo } from '../../models/restaurant-info.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  restaurantInfo = signal<RestaurantInfo | null>(null);

  constructor(private readonly infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.loadRestaurantInfo().subscribe({
      next: response => {
        this.restaurantInfo.set(response.data);
      },
      error: error => {
        console.error('Une erreur lors du chargement des infos restaurant', error);
      }
    });
  }

  getPhoneLink(): string {
    const info = this.restaurantInfo();

    if (!info) {
      return '';
    }

    return 'tel:' + info.phone.replace(/\s/g, '');
  }

  getAddressLines(): string[] {
    const info = this.restaurantInfo();

    if (!info?.address) {
      return [];
    }

    const parts = info.address.split(',');

    return [
      parts[0]?.trim() ?? '',
      parts.slice(1).join(',').trim()
    ];
  }

}
