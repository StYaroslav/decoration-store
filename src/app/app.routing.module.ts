import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AllProductsComponent } from "./products/all-products/all-products/all-products.component";
import { AuthGuard } from "./guards/auth-guard.service";

const PROJECT_ROUTES: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        component: AllProductsComponent,
        canActivate: [AuthGuard]
    },
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