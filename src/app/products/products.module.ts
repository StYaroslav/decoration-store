import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from "./all-products/all-products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { SwiperModule } from "swiper/angular";
import { RingsComponent } from './rings/rings.component';


@NgModule({
    declarations: [AllProductsComponent, RingsComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SwiperModule,
    ],
})
export class ProductsModule {
}
