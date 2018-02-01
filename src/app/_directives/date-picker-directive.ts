import {
    Component,
    ElementRef,
    Directive,
    Output,
    EventEmitter
} from '@angular/core';

declare var $ : any;

@Directive({
    selector: '[datepicker]'
})
export class DatepickerDirective {
    @Output()
    change: EventEmitter<string> = new EventEmitter();

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        $(this.elementRef.nativeElement).datepicker({
            format: 'dd/mm/yyyy',
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            nextText: 'Proximo',
            prevText: 'Anterior',
            onSelect: (dateText) => {
                this.change.emit(dateText);
            }
        });
    }
}