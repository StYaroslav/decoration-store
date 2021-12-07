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
import { AuthGuard } from "./guards/auth-guard.service";
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { DialogMessageComponent } from './dialogs/dialog-message/dialog-message.component';
import { OrderDialogComponent } from './dialogs/order-dialog/order-dialog.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarMessageComponent } from './dialogs/snackbar-message/snackbar-message.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        DialogMessageComponent,
        OrderDialogComponent,
        SnackbarMessageComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
