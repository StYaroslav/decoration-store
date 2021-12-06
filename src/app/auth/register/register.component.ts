import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', [
                Validators.required,
                Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")],
            ],
        });
    }

    navigateToLogin(): void {
        this.router.navigate(['/auth/login']);
    }

    onRegister(): void {
        this.authService.registerNewUser(this.form.value);
    }

}
