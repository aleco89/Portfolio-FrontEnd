import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../model/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  url= 'https://apiargprograma.herokuapp.com/proyecto';

  constructor(private httpClient:HttpClient) { }

  public lista():Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.url+ '/all');
  }
  
  public add(proyecto: Proyecto):Observable<any>{
    return this.httpClient.post<any>(this.url + '/new', proyecto);
  }
  
  public find(id: number):Observable<any>{
    return this.httpClient.get<Proyecto>(this.url + `/ver/${id}`);
  }
  
  public edit(proyecto: Proyecto):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', proyecto);
  }
  
  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `/delete/${id}`);
  }
}


  
