import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(public authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authService.loggedIn$.subscribe(v => {
            this.isLoggedIn = v;
        })
    }

    onLogin(): void {
        this.router.navigate(['/auth/login'])
    }

    onLogout(): void {
        this.authService.logout();
    }
}
