// import { AreaAtuacao } from '../_shared/area-atuacao/area-atuacao';
// import { NivelEscolaridade } from '../_shared/nivel-escolaridade/nivel-escolaridade';
// import { NivelFuncao } from '../_shared/nivel-funcao/nivel-funcao';
// import { TipoContratacao } from '../_shared/tipo-contratacao/tipo-contratacao';
import { IdiomaNivel } from '../_shared/idioma/idioma-nivel';
import { Headhunter } from '../headhunter/headhunter';

export class Vaga {
    constructor(
        // public id : number,
        // public titulo : string,
        // public empresa : string, 
        // public areaAtuacao : AreaAtuacao, 
        // public descricao : string, 
        // public uf : string, 
        // public cidade : string, 
        // public nivelEscolaridade : NivelEscolaridade, 
        // public nivelFuncao : NivelFuncao, 
        // public tipoContratacao : TipoContratacao
        public idVaga: number,
        public idHeadhunter: number,
        public nomeAutor: string,
        public data: Date,
        public titulo: string,
        public empresa: string,
        public areaAtuacao: string,
        public descricao: string,
        public uf: string,
        public cidade: string,
        public nivelEscolaridade: string,
        public nivelFuncao: string,
        public tipoContratacao: string,
        public ativo: boolean,
        public candidatou?: boolean,
        public idiomas?: IdiomaNivel[],
        public headhunter? : Headhunter
    ) { }
}
