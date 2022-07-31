export class Proyecto {    
    id?:number;
    nombre: string;
    comitente: string;
    descripcion: string;
    foto: string;

    constructor(nombre: string, comitente: string, descripcion: string, foto: string){        
        this.nombre= nombre;
        this.comitente= comitente;
        this.descripcion= descripcion;
        this.foto=foto;
    }

}
