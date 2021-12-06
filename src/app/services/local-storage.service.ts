import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    setItem(key: string, value: any): void {
        localStorage.setItem(key, value);
    }
}