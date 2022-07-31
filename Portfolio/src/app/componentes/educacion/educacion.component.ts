import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  isLogged=false;
  educaciones:Educacion[]=[];
  form:FormGroup;

  educacion:string="";
  periodo:string="";  
  institucion:string="";
  logoInstitucion: string="";
  
  toAdd: Educacion= new Educacion ("","","","");
  toEdit: Educacion= new Educacion("","","","");
  toDelete: Educacion=new Educacion("","","","");

  constructor(private educacionS:EducacionService, private formBuilder:FormBuilder, private tokenS:TokenService) { 

    this.form=this.formBuilder.group(
      {
        educacion: ['', [Validators.required, Validators.maxLength(45)]],        
        periodo: ['', [Validators.required, Validators.maxLength(45)]], 
        institucion: ['', [Validators.required, Validators.maxLength(255)]], 
        logoInstitucion: ['', [Validators.required, Validators.maxLength(500)]],           
      } 
    ); 
    

  }

  ngOnInit(): void {
    this.getEducacion();
    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  public getEducacion():void{
    this.educacionS.lista().subscribe(data=> {this.educaciones=data});
  }

  clearForm(){
    this.educacion=this.periodo=this.institucion=this.logoInstitucion="";
  }

  onAdd():void{
    const educacion = new Educacion(this.educacion, this.periodo, this.institucion, this.logoInstitucion);
    this.educacionS.add(educacion).subscribe({
      next: data => {
        alert("La educación fue añadida con éxito"),
        this.getEducacion(); 
        this.clearForm();      
      },       
      error:err => {
        alert("La educación no pudo ser añadida");        
      }
    });        
  }

  onEditModal(id: number){        
    this.educacionS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
  
  onUpdate():void{    
    this.educacionS.edit(this.toEdit.id!, this.toEdit).subscribe({
      next: data=>{alert("La educación fue editado con éxito"),
      this.getEducacion();
      this.clearForm()},
      error: err=>{alert("No es posible editar la educación")}        
    });
  }

  onDeleteModal(id:number){    
    this.educacionS.find(id).subscribe({
      next: data=> {this.toDelete=data},
    });
  }  
  
  onDelete(id:number):void{
    this.educacionS.delete(id).subscribe({
      next: data=>{alert("La educación fue borrada con éxito");
      this.getEducacion()},
      error: err=>{alert("No es posible borrar la educación")}        
    });
  }

}
