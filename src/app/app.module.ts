import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app.routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpErrorsInterceptor } from "./interceptors/http-errors.interceptor";
import { AuthHeaderInterceptor } from "./interceptors/auth-header.inerceptor";
import { AllProductsComponent } from './products/all-products/all-products/all-products.component';
import { AuthGuard } from "./guards/auth-guard.service";

@NgModule({
    declarations: [
        AppComponent,
        AllProductsComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorsInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
