import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";
import { StorageItem } from "../models/enums/local-storage-item.enum";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor(
        private storageService: LocalStorageService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getItem(StorageItem.ACCESS_TOKEN);
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(req);
    }
}
