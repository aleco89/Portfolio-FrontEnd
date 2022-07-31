import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idioma } from 'src/app/model/idioma';
import { IdiomaService } from 'src/app/servicios/idioma.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  isLogged=false;
  idiomas:Idioma[]=[];

  form:FormGroup;

  idioma: string= "";
  nivel: string= "";
  

  toEdit:Idioma= new Idioma("","");
  toDelete:Idioma= new Idioma("","");

  constructor(private idiomaS: IdiomaService, private formBuilder:FormBuilder, private tokenS:TokenService) { 
    
    this.form=this.formBuilder.group(
      {
        idioma: ['', [Validators.required, Validators.maxLength(45)]],        
        nivel: ['', [Validators.required, Validators.maxLength(45)]],                  
      } 
    );

  }

  ngOnInit(): void {
    this.getIdioma();

    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  getIdioma():void{
    this.idiomaS.lista().subscribe(data=> {this.idiomas=data});
  }

  clearForm(){
    this.idioma=this.nivel="";
  }

  onAdd():void{
    const idioma = new Idioma(this.idioma, this.nivel);
    this.idiomaS.add(idioma).subscribe({
      next: data => {
        alert("El idioma fue añadido con éxito");
        this.getIdioma();
        this.clearForm()},       
      error:err => {
        alert("El idioma no pudo ser añadido");        
      }
    });   
      
  }

  onEditModal(id: number){        
    this.idiomaS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
  
  onUpdate():void{    
    this.idiomaS.edit(this.toEdit).subscribe({
      next: data=>{alert("El idioma fue editado con éxito"),
      this.getIdioma();
      this.clearForm()},
      error: err=>{alert("No es posible editar el idioma")}        
    });
  }

  onDeleteModal(id:number){    
    this.idiomaS.find(id).subscribe({
      next: data=> {this.toDelete=data},
    });
  }  
  
  onDelete(id:number):void{
    this.idiomaS.delete(id).subscribe({
      next: data=>{alert("El idioma fue borrado con éxito");
      this.getIdioma()},
      error: err=>{alert("No es posible borrar el idioma")}        
    });
  }


}
