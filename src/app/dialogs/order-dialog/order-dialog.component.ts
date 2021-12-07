import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarMessageComponent } from "../snackbar-message/snackbar-message.component";

@Component({
    selector: 'app-order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackbar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            address: ['', [Validators.required]],
            telephone: ['', [Validators.required, Validators.pattern("^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$")]],
        });
    }

    submit(): void {
        if (this.form.valid) {
            this.snackbar.openFromComponent(SnackbarMessageComponent, {
                duration: 3000,
                panelClass: ['primary-snackbar']
            })
            this.router.navigate(['/products'])
        }
    }

}
