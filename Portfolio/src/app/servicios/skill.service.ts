import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../model/skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url= 'https://apiargprograma.herokuapp.com/skill';

  constructor(private httpClient:HttpClient) { }

  public lista():Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.url+ '/all');
  }
  
  public add(skill: Skill):Observable<any>{
    return this.httpClient.post<any>(this.url + '/new', skill);
  }
  
  public find(id: number):Observable<any>{
    return this.httpClient.get<Skill>(this.url + `/ver/${id}`);
  }
  
  public edit(skill: Skill):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', skill);
  }
  
  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `/delete/${id}`);
  }
  
}
