import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from "./all-products/all-products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { SwiperModule } from "swiper/angular";


@NgModule({
    declarations: [AllProductsComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SwiperModule,
    ],
})
export class ProductsModule {
}
