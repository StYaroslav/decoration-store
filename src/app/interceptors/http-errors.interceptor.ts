import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from "../services/local-storage.service";
import { StorageItem } from "../models/enums/local-storage-item.enum";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { AccessTokenResponseModel } from "../models/interfaces/login-response";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor(private storageService: LocalStorageService,
                private router: Router,
                private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401 && error instanceof HttpErrorResponse && !request.url.includes('/login') &&
                        !request.url.includes('/refresh') && !request.url.includes('/verify')) {
                        const refreshToken = this.storageService.getItem(StorageItem.REFRESH_TOKEN);
                        if (refreshToken) {
                            return this.authService.refreshToken(refreshToken).pipe(
                                switchMap(res => {
                                    if (res) {
                                        this.authService.setAccessToken(res);
                                        return next.handle(request);
                                    }
                                })
                            );
                        }
                    } else {
                        this.router.navigate(['/auth/login']);
                    }
                    return throwError(error);
                }),
            );
    }
}
