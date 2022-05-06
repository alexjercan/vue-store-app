export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: Rating;
}

export type TSort = 'desc' | 'asc';

export interface Options {
  sort?: TSort;
  limit?: number;
  category?: string;
}
