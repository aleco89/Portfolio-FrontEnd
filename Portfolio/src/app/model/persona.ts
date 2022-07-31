export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    profesion: string;
    sobreMi: string;
    lugarResidencia: string;
    fotoPerfil: string;
    fotoPortada: string;
    email: string;

    constructor(nombre: string, apellido: string, profesion: string, sobreMi: string, lugarResidencia: string, fotoPerfil: string, fotoPortada: string, email:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.profesion=profesion;
        this.sobreMi=sobreMi;
        this.lugarResidencia=lugarResidencia;
        this.fotoPerfil=fotoPerfil;
        this.fotoPortada=fotoPortada;
        this.email=email;
    }

}
