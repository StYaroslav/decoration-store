import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from "../services/local-storage.service";
import { StorageItem } from "../models/enums/local-storage-item.enum";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

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
                    let errorMessage = '';
                    if (error.status === 401 && error instanceof HttpErrorResponse) {
                        const refreshToken = this.storageService.getItem(StorageItem.REFRESH_TOKEN);
                        if (refreshToken !== "undefined") {
                            this.authService.refreshToken(refreshToken);
                        } else {
                            this.router.navigate(['/auth/login'])
                        }
                        return;
                    } else if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                }),
            );
    }
}
