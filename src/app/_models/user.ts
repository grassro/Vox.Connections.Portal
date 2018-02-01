export class User {
    constructor(
        public idUsuario? : string, 
        public email?: string, 
        public senha?: string, 
        public nome? : string,
        public tipoUsuario? : number,
        public id? : number
    ) { }
}