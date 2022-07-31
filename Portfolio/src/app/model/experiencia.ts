export class Experiencia {
    id?: number;
    trabajo: string;
    periodo: string;
    descripcionTrabajo: string;    
    lugar: string;
    logo: string;

    constructor(trabajo:string, periodo: string, descripcionTrabajo: string, lugar: string, logo: string){
        this.trabajo = trabajo;
        this.periodo=periodo;
        this.descripcionTrabajo=descripcionTrabajo;        
        this.lugar=lugar;
        this.logo=logo;
    }
}
