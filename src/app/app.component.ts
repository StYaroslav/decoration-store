import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { ProductsService } from "./products/products.service";
import { LocalStorageService } from "./services/local-storage.service";
import { StorageItem } from "./models/enums/local-storage-item.enum";
import { MatDialog } from "@angular/material/dialog";
import { DialogMessageComponent } from "./dialogs/dialog-message/dialog-message.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(public authService: AuthService,
                public productsService: ProductsService,
                private storageService: LocalStorageService,
                private dialog: MatDialog,
                private router: Router) {
    }

    get itemsInCart(): string {
        return this.storageService.getItem(StorageItem.itemsInCart);
    }

    ngOnInit(): void {
        this.authService.loggedIn$.subscribe(v => {
            this.isLoggedIn = v;
        })
    }

    onLogin(): void {
        this.router.navigate(['/auth/login'])
    }

    onLogout(): void {
        this.authService.logout();
    }

    navigateToCart(): void {
        if (!this.storageService.getItem(StorageItem.itemsInCart)) {
            this.dialog.open(DialogMessageComponent, {
                data: {
                    title: 'Cart is empty',
                    description: 'You have no items selected yet. Choose item and click add to cart button.',
                }
            })
        } else {
            this.router.navigate(['/products/cart']);
        }
    }
}
