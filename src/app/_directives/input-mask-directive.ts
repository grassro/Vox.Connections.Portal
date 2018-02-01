import { Directive, ElementRef, Input, Output, Renderer, EventEmitter, AfterViewInit } from '@angular/core';
declare var $: any;
@Directive({
    selector: '[mask]',
})
export class InputMaskDirective implements AfterViewInit {
    @Output() change: EventEmitter<any> = new EventEmitter(false);
    @Input('mask') mask: string;
    private native : HTMLInputElement;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.native = <HTMLInputElement>this.el.nativeElement;
    }

    ngAfterViewInit() {
        let e = this.native;
        let dir = this;
        $(e).inputmask(this.mask);
        $(e).change((ev) => {
            dir.change.next($(e).inputmask('unmaskedvalue'));
        });
    }
}