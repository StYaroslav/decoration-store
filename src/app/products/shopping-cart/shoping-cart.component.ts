import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { ProductsItem } from "../../models/interfaces/products-item";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { OrderDialogComponent } from "../../dialogs/order-dialog/order-dialog.component";

@Component({
    selector: 'app-shoping-cart',
    templateUrl: './shoping-cart.component.html',
    styleUrls: ['./shoping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
    uniqueItems: ProductsItem[];
    totalPrice: number = 0

    constructor(public productsService: ProductsService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.uniqueItems = [...new Map(this.productsService.itemsInCart.map(item =>
            [item['id'], item])).values()];

        this.uniqueItems = this.productsService.getRepeatItemsCount(this.uniqueItems)
        this.countTotalPrice();
    }

    countTotalPrice(): void {
        let currentTotalPrice: number = 0;
        this.uniqueItems.forEach(i => {
            currentTotalPrice += i.price * i.quantity;
        })
        this.totalPrice = currentTotalPrice;
    }

    addItem(item: ProductsItem): void {
        item.quantity += 1;
        this.countTotalPrice();
    }

    removeItem(item: ProductsItem): void {
        item.quantity -= 1;
        this.countTotalPrice();
    }

    makeOrder(): void {
        this.dialog.open(OrderDialogComponent);
    }

}
