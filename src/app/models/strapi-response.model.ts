export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: MetaResponse;
}

export interface StrapiResponse<T> {
    data: T;
    meta: MetaResponse;
}


export interface MetaResponse {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  url: string;

  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}