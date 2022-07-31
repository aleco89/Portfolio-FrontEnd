import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url= "https://apiargprograma.herokuapp.com/educacion"

  constructor(private httpClient: HttpClient) { }

  public lista():Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.url + '/all')
  }

  public add(educacion:Educacion):Observable<any>{
    return this.httpClient.post<any>(this.url + '/new', educacion)
  }

  public find(id:number):Observable<any>{
    return this.httpClient.get<Educacion>(this.url +`/ver/${id}`);
  }
  
  public edit(id:number,educacion:Educacion):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', educacion);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `/delete/${id}`);
  }
  
  
}
