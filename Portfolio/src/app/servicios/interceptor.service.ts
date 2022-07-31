import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private tokenS:TokenService) { }

  intercept(request: HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    let intReq= request;
    const token= this.tokenS.getToken();
    if(token !=null){
      intReq=request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token)
      });
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider= [{
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}];
