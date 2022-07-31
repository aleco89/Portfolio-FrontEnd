
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  isLogged=false;
  skills: Skill[] = [];
  form:FormGroup;

  skill:string="";
  porcentaje:string="";  

  toEdit: Skill= new Skill("","");
  toDelete: Skill=new Skill("","");   

  constructor(private skillS: SkillService, private formBuilder:FormBuilder, private tokenS: TokenService) {

    this.form=this.formBuilder.group(
      {
        skill: ['', [Validators.required, Validators.maxLength(45)]],        
        porcentaje: ['', [Validators.required, Validators.maxLength(45)]],         
      } 
    );
  }

  ngOnInit(): void {
    this.getSkill();
    if(this.tokenS.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  getSkill():void{
    this.skillS.lista().subscribe(data=> {this.skills=data});
  }
  
  clearForm(){
    this.skill=this.porcentaje="";
  }
    
  onAdd():void{
    const skill = new Skill(this.skill, this.porcentaje);
    this.skillS.add(skill).subscribe({
      next: data => {
        alert("La habilidad ha sido añadida con éxito"),
        this.getSkill(); 
        this.clearForm()},       
      error:error => {
        alert("La habilidad no pudo ser añadido");        
      }
    });       
  }
    
  onEditModal(id: number){        
    this.skillS.find(id).subscribe({
      next: data=> {this.toEdit=data},
    });    
  }
    
  onUpdate():void{    
    this.skillS.edit(this.toEdit).subscribe({
      next: data=>{alert("La habilidad fue editada con éxito"),
      this.getSkill(),
      this.clearForm()},
      error: error=>{alert("No es posible editar la habilidad")}        
    });
  }
    
  onDeleteModal(id:number){    
    this.skillS.find(id).subscribe({
      next: data=> {this.toDelete=data},
    });
  }
    
  onDelete(id:number):void{
    this.skillS.delete(id).subscribe({
      next: data=>{alert("La habilidad fue borrada con éxito");
      this.getSkill()},
      error: error=>{alert("No es posible borrar la habilidad")}        
    });
  }


}
