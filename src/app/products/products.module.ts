import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from "./all-products/all-products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { SwiperModule } from "swiper/angular";
import { RingsComponent } from './rings/rings.component';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { NecklacesComponent } from './necklaces/necklaces.component';
import { ShoppingCartComponent } from './shopping-cart/shoping-cart.component';


@NgModule({
    declarations: [
        AllProductsComponent,
        RingsComponent,
        BraceletsComponent,
        NecklacesComponent,
        ShoppingCartComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SwiperModule,
    ],
})
export class ProductsModule {
}
