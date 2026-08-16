import { Component, OnInit } from '@angular/core';
import { Category, MenuItem } from '../../models/menu-item.model';
import { MenuService } from '../../services/menu';
import { error } from 'console';


@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  categories: Category[] = [];
  menuItems: MenuItem[] = [];

  selectedCategory: Category | null = null;

  constructor(private readonly menuService: MenuService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: response => {
        this.menuItems = response.data.filter(
          item => item.available
        );
      },
      error: error => {
        console.error(
          'Erreur lors du chargement du menu',
          error
        );
      }
    });
  }

  private loadCategories(): void {
    this.menuService.getCategories().subscribe({
      next: response => {
        this.categories = response.data;

        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[0];
        }
      },
      error: error => {
        console.error('Erreur chargement catégories', error);
      }
    })
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }

  get filteredMenuItems(): MenuItem[] {
    if (!this.selectedCategory) {
      return [];
    }

    return this.menuItems.filter(
      items => items.category?.documentId === this.selectedCategory?.documentId
    );
  }

  getImageUrl(item: MenuItem): string {
    return this.menuService.getImageUrl(item);
  }
}
