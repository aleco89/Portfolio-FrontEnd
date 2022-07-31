import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../model/idioma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  url="http://localhost:8080/idioma";

  constructor(private httpClient: HttpClient) { }

  public lista():Observable<Idioma[]>{
    return this.httpClient.get<Idioma[]>(this.url+ '/all');
  }
  
  public add(idioma: Idioma):Observable<any>{
    return this.httpClient.post<any>(this.url + '/new', idioma);
  }
  
  public find(id: number):Observable<any>{
    return this.httpClient.get<Idioma>(this.url + `/ver/${id}`);
  }
  
  public edit(idioma: Idioma):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', idioma);
  }
  
  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `/delete/${id}`);
  }


}
