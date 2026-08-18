import { Component, OnInit, signal } from '@angular/core';
import { CarrouselService } from '../../services/carrousel-service';
import { CarrouselItem } from '../../models/carrousel.model';
import { StrapiImage } from '../../models/strapi-response.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {

  carrouselItems = signal<CarrouselItem[]>([]);

  constructor(private readonly carrouselService: CarrouselService) {}

  ngOnInit(): void {
    this.carrouselService.loadCarrouselItems().subscribe({
      next: response => {
        this.carrouselItems.set(
          response.data.filter(item => item.active)
        );
      },
      error: error => {
        console.error('Erreur lors du chargement du carrousel', error);
      }
    });
  }

  getImageUrl(item: StrapiImage | null): string {
    return this.carrouselService.getImageUrl(item);
  }
}
