import { Injectable } from '@angular/core';
import {  CanActivateChild, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageItem } from "../models/enums/local-storage-item.enum";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authService: AuthService,
        private localStorage: LocalStorageService,
    ) {
    }
    canActivateChild(): boolean {
        return this.canActivate();
    }

    canActivate(): boolean {
        if (typeof window !== 'undefined') {

            if (this.localStorage.getItem(StorageItem.ACCESS_TOKEN)) {
                return true;
            } else if (this.localStorage.getItem(StorageItem.REFRESH_TOKEN)) {
                this.authService.refreshToken(this.localStorage.getItem(StorageItem.REFRESH_TOKEN));
                return true;
            } else {
                console.log('%cTOKEN EXPIRED OR NOT FOUND!',
                    'color: red; font-size: x-large');
                this.router.navigate(['/auth/login']);
                return false;
            }
        }
    }
}
