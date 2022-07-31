import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})

export class ExperienciaService {
  url= 'http://localhost:8080/experiencia';

  constructor(private httpClient:HttpClient) { }

  public lista():Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.url+ '/all');
  }

  public add(experiencia: Experiencia):Observable<any>{
    return this.httpClient.post<any>(this.url + '/new', experiencia);
  }

  public find(id: number):Observable<any>{
    return this.httpClient.get<Experiencia>(this.url + `/ver/${id}`);
  }

  public edit(experiencia: Experiencia):Observable<any>{
    return this.httpClient.put<any>(this.url + '/edit', experiencia);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `/delete/${id}`);
  }

}
