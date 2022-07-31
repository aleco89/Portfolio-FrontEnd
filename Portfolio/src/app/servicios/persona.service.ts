import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  url= 'http://localhost:8080/persona';

  constructor(private httpClient: HttpClient) { }

  public getPerso(): Observable<Persona>{
    return this.httpClient.get<Persona>(this.url+ '/ver/5');
  }   

  public find(id: number):Observable<any>{
    return this.httpClient.get<Persona>(this.url + `/ver/${id}`);
  }

  public edit(persona: Persona):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', persona);
  }

}

