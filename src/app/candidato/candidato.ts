import { NivelEscolaridade } from "../_shared/nivel-escolaridade/nivel-escolaridade";
import { AreaAtuacao } from "../_shared/area-atuacao/area-atuacao";
import { NivelFuncao } from "../_shared/nivel-funcao/nivel-funcao";
import { IdiomaNivel } from "../_shared/idioma/idioma-nivel";
import { Link } from "../_shared/link/link";
import { AreaExecutiva } from "../_shared/area-executiva/area-executiva";
import { Esfera } from "../_shared/esfera/esfera";
import {TipoContratacao} from "../_shared/tipo-contratacao/tipo-contratacao";

export class Candidato {
    idCandidato: number;
    idUsuario?: string;
    nome: string;
    dataNascimento: Date;
    email: string;
    celular: string;
    estado: string;
    cidade: string;
    empresa: string;
    linkedin: string;
    nivelEscolaridade: string;
    areaAtuacao: string;
    nivelFuncao: string;
    areaInteresse: string;
    empregado: Boolean;
    idiomas?: IdiomaNivel[];
    tipoContratacao: string;
    link?: string;
    areaExecutiva?: string;
    esfera: string;
    curriculo?: {
        idCurriculo : number,
        curriculumVitae : string,
        fileNameCurriculumVitae : string,
        fileTypeCurriculumVitae : string
    }
    constructor() { }
}
