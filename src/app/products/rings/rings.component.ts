import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { ProductsItem } from "../../models/interfaces/products-item";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-rings',
    templateUrl: './rings.component.html',
    styleUrls: ['./rings.component.scss'],
})
export class RingsComponent implements OnInit {
    rings: ProductsItem[];
    isLoggedIn: boolean = false;

    constructor(public productsService: ProductsService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.productsService.getRings().subscribe(result => {
            this.rings = result;
        });

        this.authService.loggedIn$.subscribe(v => {
            this.isLoggedIn = v;
        })
    }

}
