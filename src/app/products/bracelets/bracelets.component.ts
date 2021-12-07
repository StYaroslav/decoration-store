import { Component, OnInit } from '@angular/core';
import { ProductsItem } from "../../models/interfaces/products-item";
import { ProductsService } from "../products.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-bracelets',
    templateUrl: './bracelets.component.html',
    styleUrls: ['./bracelets.component.scss'],
})
export class BraceletsComponent implements OnInit {
    bracelets: ProductsItem[];
    isLoggedIn: boolean = false;

    constructor(public productsService: ProductsService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.productsService.getBracelets().subscribe(result => {
            this.bracelets = result;
        });

        this.authService.loggedIn$.subscribe(v => {
            this.isLoggedIn = v;
        })
    }
}
