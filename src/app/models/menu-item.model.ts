import { StrapiImage } from "./strapi-response.model";

export interface Category {
  id: number;
  documentId: string;
  name: string;
  order: number;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  documentId: string;

  name: string;
  description: string | null;
  ingredients: Ingredient[];

  price: number;
  available: boolean;
  order: number;

  image: StrapiImage | null;
  category: Category | null;
}

export interface GalleryImage {
  id: number;
  title: string;
  order: number;
  active: boolean;
  image: StrapiImage | null;
}
