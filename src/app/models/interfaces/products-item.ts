export interface ProductsItem {
    id: number;
    title: string;
    price: number;
    discountPrice: number;
    description: string;
    image: string;
    category: string;
    quantity?: number;
}