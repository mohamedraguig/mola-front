import { Component, OnInit, signal } from '@angular/core';
import { AboutService } from '../../services/about-service';
import { AboutSection } from '../../models/about.model';
import { StrapiImage } from '../../models/strapi-response.model';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {

  aboutSection = signal<AboutSection | null>(null);
  displayedImages: StrapiImage[] = [];

  constructor(private readonly aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.loadAboutSection().subscribe({
      next: response => {
          this.aboutSection.set(response.data);
          this.displayedImages = this.getRandomImages(response.data.images);
      },
      error: error => {
        console.error('Erreur lors du chargement de la section about', error);
      }
    });
  }

  private getRandomImages(images: StrapiImage[]): StrapiImage[] {
    return [...images]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  getImageUrl(image: StrapiImage): string {
    return this.aboutService.getImageUrl(image);
  }

  getImageOrder(index: number): string {
    const classes = ['first', 'second', 'third'];
    return classes[index] ?? 'third';
  }
}
