import { IdiomaNivel } from "../_shared/idioma/idioma-nivel";

export class Gestor {
    idGestor: number;
    idUsuario?: string;
    nome: string;
    dataNascimento: Date;
    email: string;
    celular: string;
    estado: string;
    cidade: string;
    nivelEscolaridade: string;
    areaAtuacao: string;
    nivelFuncao: string;
    formacao: string;
    areaInteresse: string;
    empregado: Boolean;
    idiomas?: IdiomaNivel[];
    link?: string;
    areaExecutiva?: string;
    esfera: string;
    linkedin: string;
    empresa:string;
    curriculo?: {
        idCurriculo : number,
        curriculumVitae : string,
        fileNameCurriculumVitae : string,
        fileTypeCurriculumVitae : string
    }
    constructor() { }
}
