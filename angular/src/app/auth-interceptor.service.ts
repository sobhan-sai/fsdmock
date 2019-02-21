import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { TokenstorageService } from './tokenstorage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {
  constructor(private token:TokenstorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    console.log(token);
    if (token != null) {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        console.log(authReq);
    }
    return next.handle(authReq);
}
}

export const httpInterceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];

