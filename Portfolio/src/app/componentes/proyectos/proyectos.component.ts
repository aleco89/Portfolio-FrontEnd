import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  isLogged=false;
  proyecto: Proyecto[] = [];
  form:FormGroup;

  nombre:string="";
  comitente:string="";
  descripcion:string="";
  foto: string="";

  toEdit: Proyecto= new Proyecto("","","","");
  toDelete: Proyecto=new Proyecto("","","","");   

  constructor(private proyectoS: ProyectoService, private formBuilder:FormBuilder, private tokenS:TokenService) { 
    
    this.form=this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(45)]],        
        comitente: ['', [Validators.required, Validators.maxLength(45)]], 
        descripcion: ['', [Validators.required, Validators.maxLength(500)]],                
        foto: ['', [Validators.required, Validators.maxLength(500)]],           
      } 
    );
  }
    
  ngOnInit(): void {
    this.getProyecto(); 
    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }     
  }
    
  getProyecto():void{
    this.proyectoS.lista().subscribe(data=> {this.proyecto=data});
  }
    
  clearForm(){
    this.nombre=this.comitente=this.descripcion=this.foto="";
  }
  
  onAdd():void{
    const proyecto = new Proyecto(this.nombre, this.comitente, this.descripcion, this.foto);
    this.proyectoS.add(proyecto).subscribe({
      next: data => {
        alert("El proyecto fue añadido con éxito"); 
        this.getProyecto(); 
        this.clearForm();
      },       
      error:error => {
        alert("El proyecto no pudo ser añadido");        
      }
    });       
  }
    
  onEditModal(id: number){        
    this.proyectoS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
    
  onUpdate():void{    
    this.proyectoS.edit(this.toEdit).subscribe({
      next: data=>{alert("El proyecto fue editado con éxito"),
      this.getProyecto(),
      this.clearForm();},
      error: error=>{alert("No es posible editar el proyecto")}        
    });
  }
    
  onDeleteModal(id:number){    
    this.proyectoS.find(id).subscribe({
      next: data=> {this.toDelete=data},
    });
  }
    
  onDelete(id:number):void{
    this.proyectoS.delete(id).subscribe({
      next: data=>{alert("El proyecto fue borrado con éxito");
      this.getProyecto()},
      error: error=>{alert("No es posible borrar el proyecto")}        
    });
  }
  
}
