export class Skill {
    id?: number;
    skill: string;
    porcentaje: string;

    constructor(skill: string, porcentaje:string){
        this.skill=skill;
        this.porcentaje=porcentaje;
    }
}

