import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AllProductsComponent } from "./products/all-products/all-products.component";
import { AuthGuard } from "./guards/auth-guard.service";
import { PageNotFoundComponent } from "./404/page-not-found/page-not-found.component";

const PROJECT_ROUTES: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    },
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(PROJECT_ROUTES),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}