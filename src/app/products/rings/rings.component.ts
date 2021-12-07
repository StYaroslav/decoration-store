import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-rings',
    templateUrl: './rings.component.html',
    styleUrls: ['./rings.component.scss'],
})
export class RingsComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http.get('http://127.0.0.1:8000/api/items/rings').subscribe(v => {
            console.log(v);
        });
    }

}
