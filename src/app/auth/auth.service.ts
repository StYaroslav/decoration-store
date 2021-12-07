import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/interfaces/user";
import { Router } from "@angular/router";
import { AccessRefreshTokenResponseModel, AccessTokenResponseModel } from "../models/interfaces/login-response";
import { LocalStorageService } from "../services/local-storage.service";
import { StorageItem } from "../models/enums/local-storage-item.enum";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    apiUrl: string = 'http://127.0.0.1:8000/';
    private loggedIn = new BehaviorSubject<boolean>(false);
    loggedIn$ = this.loggedIn.asObservable();

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private storageService: LocalStorageService
    ) {
        this.checkAuthorization();
    }

    private checkAuthorization(): void {
        this.storageService.getItem(StorageItem.ACCESS_TOKEN)
            ? this.loggedIn.next(true)
            : this.loggedIn.next(false);
    }

    private setTokens(res: AccessRefreshTokenResponseModel): void {
        const { access, refresh } = res;
        this.storageService.setItem(StorageItem.ACCESS_TOKEN, access);
        this.storageService.setItem(StorageItem.REFRESH_TOKEN, refresh);
    }

    setAccessToken(res: AccessTokenResponseModel): void {
        this.storageService.setItem(StorageItem.ACCESS_TOKEN, res.access);
    }

    private removeTokens(): void {
        this.storageService.removeItem(StorageItem.ACCESS_TOKEN);
        this.storageService.removeItem(StorageItem.REFRESH_TOKEN);
    }

    registerNewUser(user: User): void {
        this.httpClient.post(`${this.apiUrl}auth/users/`, user).subscribe(res => {
            if (res) {
                this.router.navigate(['/auth/login']);
            }
        })
    }

    login(user: User): void {
        this.httpClient.post<AccessRefreshTokenResponseModel>(`${this.apiUrl}auth/jwt/create`, user).subscribe((res) => {
            if (res) {
                this.setTokens(res);
                this.router.navigate(['/products']);
                this.loggedIn.next(true);
            }
        })
    }

    logout(): void {
        this.removeTokens();
        this.checkAuthorization();
        this.router.navigate(['/auth/login']);
    }

    refreshToken(refreshToken: string): Observable<AccessTokenResponseModel> {
        return this.httpClient.post<AccessTokenResponseModel>(`${this.apiUrl}auth/jwt/refresh`, {refresh: refreshToken})
    }
}