
export interface Product {
  _id: string;
  name: string;
  details: string;
  price: number;
  productImage: string;
  dimensions?: string;
  technique?: string;
  creationDate?: string;
  author?: string; 
}

export interface HomeState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}
