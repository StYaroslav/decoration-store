import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { ProductsItem } from "../models/interfaces/products-item";
import { LocalStorageService } from "../services/local-storage.service";
import { StorageItem } from "../models/enums/local-storage-item.enum";

@Injectable({providedIn: 'root'})
export class ProductsService {
    API_URL = 'http://127.0.0.1:8000';
    itemsInCart: ProductsItem[] = [];

    repeatedItemsCount: Subject<number> = new Subject<number>();

    constructor(private httpClient: HttpClient,
                private storageService: LocalStorageService) {
    }

    getRepeatItemsCount(uniqueItems: ProductsItem[]): ProductsItem[] {
        return uniqueItems.map(i => {
            return {...i, quantity: this.itemsInCart.filter(itemInCart => i.id === itemInCart.id).length};
        })
    }

    getBracelets(): Observable<ProductsItem[]> {
        return this.httpClient.get<ProductsItem[]>(`${this.API_URL}/api/items/bracelets`);
    }

    getRings(): Observable<ProductsItem[]> {
        return this.httpClient.get<ProductsItem[]>(`${this.API_URL}/api/items/rings`);
    }

    getNecklaces(): Observable<ProductsItem[]> {
        return this.httpClient.get<ProductsItem[]>(`${this.API_URL}/api/items/chokers`);
    }

    addToCart(item: ProductsItem): void {
        this.itemsInCart.push(item);
        this.storageService.setItem(StorageItem.itemsInCart, this.itemsInCart.length);
    }

    getImagePath(item: ProductsItem): string {
        return `${this.API_URL}/static${item.image}`;
    }
}