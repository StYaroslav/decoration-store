import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {

    constructor(private httpService: HttpClient) {

    }

    ngOnInit(): void {
        this.httpService.get('http://127.0.0.1:8000/api/all-profiles').subscribe(v => {
            console.log(v);
        })
    }

}
