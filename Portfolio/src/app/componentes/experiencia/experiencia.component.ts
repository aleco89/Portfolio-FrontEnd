import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  isLogged=false;
  experiencia: Experiencia[] = [];
  form:FormGroup;

  trabajo:string="";
  periodo:string="";
  descripcionTrabajo:string="";
  lugar:string="";
  logo: string="";
  
  toAdd: Experiencia= new Experiencia ("","","","","");
  toEdit: Experiencia= new Experiencia("","","","","");
  toDelete: Experiencia=new Experiencia("","","","","");

  
  constructor(private experienciaS:ExperienciaService,private tokenS:TokenService, private formBuilder:FormBuilder) {     
    
    this.form=this.formBuilder.group(
      {
        trabajo: ['', [Validators.required, Validators.maxLength(45)]],        
        periodo: ['', [Validators.required, Validators.maxLength(45)]], 
        descripcionTrabajo: ['', [Validators.required, Validators.maxLength(500)]],        
        lugar: ['', [Validators.required, Validators.maxLength(255)]], 
        logo: ['', [Validators.required, Validators.maxLength(500)]],           
      } 
    ); 
  }

  ngOnInit(): void {
    this.getExperiencia();
    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }   

  getExperiencia():void{
    this.experienciaS.lista().subscribe(data=> {this.experiencia=data});
  }

  clearForm(){
    this.trabajo=this.periodo=this.descripcionTrabajo=this.lugar=this.logo="";
  }

  onAdd():void{
    const experiencia = new Experiencia(this.trabajo, this.periodo, this.descripcionTrabajo, this.lugar, this.logo);
    this.experienciaS.add(experiencia).subscribe({
      next: data => {
        alert("La experiencia fue añadida con éxito"),
        this.getExperiencia();
        this.clearForm()},       
      error:err => {
        alert("La experiencia no pudo ser añadida");        
      }
    });        
  }

  onEditModal(id: number){        
    this.experienciaS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
  
  onUpdate():void{    
    this.experienciaS.edit(this.toEdit).subscribe({
      next: data=>{alert("La experiencia fue editado con éxito"),
      this.getExperiencia(),
      this.clearForm()},
      error: err=>{alert("No es posible editar la experiencia")}        
    });
  }

  onDeleteModal(id:number){    
    this.experienciaS.find(id).subscribe({
      next: data=> {this.toDelete=data},
    });
  }  
  
  onDelete(id:number):void{
    this.experienciaS.delete(id).subscribe({
      next: data=>{alert("La experiencia fue borrada con éxito");
      this.getExperiencia()},
      error: err=>{alert("No es posible borrar la experiencia")}        
    });
  }

}

  
