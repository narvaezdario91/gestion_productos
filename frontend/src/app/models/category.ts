import { Product } from './product';

export class Category {
    _id: string;
    name: string;
    description: string;
    products: Product[];
    userId: string;
}