export class Educacion {
    id?: number;
    educacion: string;
    periodo: string;    
    institucion: string;
    logoInstitucion: string;

    constructor(educacion: string, periodo: string, institucion: string, logoInstitucion:string){
        this.educacion=educacion;
        this.periodo=periodo;        
        this.institucion=institucion;
        this.logoInstitucion=logoInstitucion;
    }

}
