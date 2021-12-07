import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from "./all-products/all-products.component";
import { RingsComponent } from "./rings/rings.component";
import { AuthGuard } from "../guards/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        component: AllProductsComponent,
    },
    {
        path: 'rings',
        component: RingsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }
