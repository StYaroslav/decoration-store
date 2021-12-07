import { Component, OnInit } from '@angular/core';
import { ProductsItem } from "../../models/interfaces/products-item";
import { ProductsService } from "../products.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-necklaces',
    templateUrl: './necklaces.component.html',
    styleUrls: ['./necklaces.component.scss'],
})
export class NecklacesComponent implements OnInit {
    necklaces: ProductsItem[];
    isLoggedIn: boolean = false;

    constructor(public productsService: ProductsService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.productsService.getNecklaces().subscribe(result => {
            this.necklaces = result;
        });

        this.authService.loggedIn$.subscribe(v => {
            this.isLoggedIn = v;
        })
    }
}
