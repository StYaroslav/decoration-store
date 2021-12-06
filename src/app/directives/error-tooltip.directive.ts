import {
    Directive,
    ElementRef,
    HostListener, OnDestroy, OnInit,
    Renderer2,
} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from "rxjs";


@Directive({
    selector: '[errorTooltip]',
})
export class ErrorTooltipDirective implements Validator, OnInit, OnDestroy {
    private tooltip: HTMLElement;
    private errorMsg: string;
    private isFocused: boolean = false;
    private sub$: Subscription = new Subscription();

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private ngControl: NgControl,
    ) {
    }

    ngOnInit(): void {
        this.sub$.add(this.ngControl.control.valueChanges.subscribe(val => {
            setTimeout(() => {
                this.validate(this.ngControl.control);
            });
        }));
    }

    ngOnDestroy() {
        this.sub$.unsubscribe();
    }

    validate(control: AbstractControl): ValidationErrors {
        const { errors } = control;
        if (errors != null) {
            const errorKey = Object.keys(errors)[0];
            this.errorMsg = JSON.stringify(errors);
            if (errorKey === 'pattern') this.errorMsg = 'Password should be longer than 8 symbols and contain at least 1 digit';
            if (errorKey === 'required') this.errorMsg = 'Required'
        }
        if (errors == null || this.errorMsg != this.errorMsg) {
            this.errorMsg = null;
            this.tooltipHide();
        }
        if (errors != null && this.isFocused) {
            this.tooltipShow(this.errorMsg);
        }
        return null;
    }

    @HostListener('focusin', ['$event'])
    focusin(): void {
        this.isFocused = true;
        if (this.errorMsg == null && this.ngControl.control.valid) return;
        this.validate(this.ngControl.control);
    }

    @HostListener('focusout', ['$event'])
    focusout(): void {
        this.isFocused = false;
    }

    tooltipShow(msg: string): void {
        if (this.tooltip != null) {
            this.tooltipHide();
        }
        const { clientWidth } = (<HTMLElement>this.elementRef.nativeElement);
        this.tooltip = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltip, 'noselect');
        this.renderer.addClass(this.tooltip, 'directive-errorTooltip');
        this.renderer.setStyle(this.tooltip, 'width', `${clientWidth < 120 ? 120 : clientWidth}px`);
        this.renderer.appendChild(this.tooltip, this.renderer.createText(msg));
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.tooltip);
    }

    tooltipHide(): void {
        if (this.tooltip == null) return;
        this.renderer.removeChild(this.elementRef.nativeElement.parentElement, this.tooltip);
        this.tooltip = null;
    }
}
