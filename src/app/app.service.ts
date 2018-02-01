import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class AppService {

    constructor() { }

    registrarFormWizard(jquery: any, form : FormGroup, formName: string, validate: (index: number, form : FormGroup) => boolean) {
        var $this = jquery("#" + formName),
            $tabs = $this.find('> .tabs > li'),
            $progress = $this.find(".progress-indicator"),
            _index = $this.find('> ul > li.active').index();

        // Validation
        var checkFormWizardValidaion = function (tab, navigation, index) {
            if ($this.hasClass('validate')) {
                var $valid = validate($this.bootstrapWizard('currentIndex'), form);

                if (!$valid) {
                    $this.data('validator').focusInvalid();
                    return false;
                }
            }

            return true;
        };

        // Setup Progress
        if (_index > 0) {
            $progress.css({ width: _index / $tabs.length * 100 + '%' });
            $tabs.removeClass('completed').slice(0, _index).addClass('completed');
        }

        $this.bootstrapWizard({
            tabClass: "",
            onTabShow: function ($tab, $navigation, index) {
                var pct = $tabs.eq(index).position().left / $tabs.parent().width() * 100;

                $tabs.removeClass('completed').slice(0, index).addClass('completed');
                $progress.css({ width: pct + '%' });
            },

            onNext: checkFormWizardValidaion,
            onTabClick: function (activeTab, navigation, currentIndex, nextIndex) {
                if (nextIndex <= currentIndex) {
                    return;
                }
                return checkFormWizardValidaion(activeTab, navigation, currentIndex);
            }
        });

        $this.data('bootstrapWizard').show(_index);

        // $this.find('.pager a').on('click', function (ev) {
        //     ev.preventDefault();
        // });

        $tabs.find('a').on('click', function (ev) {
            return false;
        });

        // jquery("#" + formName).each(function(i, el)
        // {
        // var $this = jquery(el),
        //     $tabs = $this.find('> .tabs > li'),
        //     $progress = $this.find(".progress-indicator"),
        //     _index = $this.find('> ul > li.active').index();

        // // Validation
        // var checkFormWizardValidaion = function(tab, navigation, index)
        //     {
        //           if($this.hasClass('validate'))
        //           {
        //             var $valid = validate($this.bootstrapWizard('currentIndex'), el);

        //             if(!$valid)
        //             {
        //                 $this.data('validator').focusInvalid();
        //                 return false;
        //             }
        //         }

        //           return true;
        //     };

        // // Setup Progress
        // if(_index > 0)
        // {
        //     $progress.css({width: _index/$tabs.length * 100 + '%'});
        //     $tabs.removeClass('completed').slice(0, _index).addClass('completed');
        // }

        // $this.bootstrapWizard({
        //     tabClass: "",
        //       onTabShow: function($tab, $navigation, index)
        //       {
        //           var pct = $tabs.eq(index).position().left / $tabs.parent().width() * 100;

        //           $tabs.removeClass('completed').slice(0, index).addClass('completed');
        //           $progress.css({width: pct + '%'});
        //       },

        //       onNext: checkFormWizardValidaion,
        //       onTabClick: function(activeTab, navigation, currentIndex, nextIndex) {
        //         if (nextIndex <= currentIndex) {
        //           return;
        //         }
        //         return checkFormWizardValidaion(activeTab, navigation,currentIndex);
        //       }
        //   });

        //   $this.data('bootstrapWizard').show( _index );

        //   $this.find('.pager a').on('click', function(ev)
        //   {
        //       ev.preventDefault();
        //   });

        //   $tabs.find('a').on('click', function(ev)
        //   {
        //       return false;
        //   });
        // });
    }

    getDataTableConfig(columnsDefinition?: any[]){
        return {
            aLengthMenu: [
                [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]
            ],
            aoColumns: columnsDefinition,
            "oLanguage": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            }
        }
    }

    registrarDatatable(jquery: any, name: string, columnsDefinition?: any[]): any {
        return jquery("#" + name).dataTable({
            aLengthMenu: [
                [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]
            ],
            aoColumns: columnsDefinition,
            "oLanguage": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            }
        });
    }

    parseDateFromControl(value): Date {
        if (!value)
            return null;
        var dateParts = value.split('/');
        return new Date(dateParts[2], dateParts[1], dateParts[0]);
    }
}
