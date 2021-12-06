import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register/register.component";
import { ErrorTooltipDirective } from "../directives/error-tooltip.directive";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ErrorTooltipDirective,
    ],
})
export class AuthModule {
}
