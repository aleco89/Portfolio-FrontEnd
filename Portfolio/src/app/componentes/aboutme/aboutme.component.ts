import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})

export class AboutmeComponent implements OnInit {
  isLogged=false;
  toEdit: Persona= new Persona("","","","","","","","");
  persona: Persona= new Persona("","","","","","","","");
  form:FormGroup;

  constructor(private personaS:PersonaService, private formBuilder: FormBuilder, private tokenS:TokenService) { 
    this.form=this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(45)]],
        apellido: ['', [Validators.required, Validators.maxLength(45)]],
        profesion: ['', [Validators.required, Validators.maxLength(45)]],
        sobreMi: ['', [Validators.required, Validators.maxLength(500)]],
        lugarResidencia: ['', [Validators.required, Validators.maxLength(45)]],        
        fotoPerfil: ['', [Validators.required, Validators.maxLength(45)]],
        fotoPortada: ['', [Validators.required, Validators.maxLength(45)]],
        email: ['', [Validators.required, Validators.maxLength(45)]],         
      } 
    );
  }    

  ngOnInit(): void {
    this.getPersona();
    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  getPersona():void{    
    this.personaS.getPerso().subscribe(data=> {this.persona=data});
  }

  onEditModal(id: number){        
    this.personaS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
  onUpdate():void{    
    this.personaS.edit(this.toEdit).subscribe({
      next: data=>{alert("La sección fue editada con éxito"),
      this.getPersona()},
      error: error=>{alert("No es posible editar la sección")}        
    });
  }
  
}
