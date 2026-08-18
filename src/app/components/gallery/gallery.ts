import { Component, OnInit, signal } from '@angular/core';
import { GalleryImage } from '../../models/menu-item.model';
import { GalleryImageService } from '../../services/gallery-image';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  
  images = signal<GalleryImage[]>([]);

  constructor(private readonly galleryImageService: GalleryImageService) {}

  ngOnInit(): void {
    this.galleryImageService.getGalleryImages().subscribe({
      next: response => {
        this.images.set(
          response.data.filter(item => item.active)
        );
      },
      error: error => {
        console.error(
          'Erreur lors du chargement de la gallerie',
          error
        );
      }
    });
  }

  getImageUrl(item: GalleryImage): string {
    return this.galleryImageService.getImageUrl(item);
  }
}
