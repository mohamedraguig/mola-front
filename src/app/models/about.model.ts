import { StrapiImage } from "./strapi-response.model";

export interface AboutSection {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    images: StrapiImage[];
}