export class Usuario {
    username:string;
    password:string;
    authorities:string;

    constructor (username: string, password:string, authorities:string){
        this.username=username;
        this.password=password;
        this.authorities=authorities
    }
}
