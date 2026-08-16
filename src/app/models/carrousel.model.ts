import { StrapiImage } from "./strapi-response.model";

export interface CarrouselItem {
    id: number;
    shortTitle: string;
    title: string;   
    description: string | null;
    image: StrapiImage | null;
    buttonLabel: string | null;
    buttonLink: string | null;
    order: number;
    active: boolean;
}