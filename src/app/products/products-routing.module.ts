import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from "./all-products/all-products.component";
import { RingsComponent } from "./rings/rings.component";
import { BraceletsComponent } from "./bracelets/bracelets.component";
import { NecklacesComponent } from "./necklaces/necklaces.component";
import { ShoppingCartComponent } from "./shopping-cart/shoping-cart.component";

const routes: Routes = [
    {
        path: '',
        component: AllProductsComponent,
    },
    {
        path: 'rings',
        component: RingsComponent,
    },
    {
        path: 'bracelets',
        component: BraceletsComponent,
    },
    {
        path: 'chokers',
        component: NecklacesComponent,
    },
    {
        path: 'cart',
        component: ShoppingCartComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }
