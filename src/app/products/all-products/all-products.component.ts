import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AllProductsComponent implements OnInit {
    config: SwiperOptions = {
        effect: 'fade',
        pagination: {
            dynamicBullets: true,
        },
    };

    constructor() {

    }

    ngOnInit(): void {
    }

}
