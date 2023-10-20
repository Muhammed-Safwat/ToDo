import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {TokenStorageService} from '../../services/token-storage.service';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private tokenService : TokenStorageService,
               public router : Router,
               private  authService : AuthService
             ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set(environment.CSRF_TOKEN , localStorage.getItem(environment.CSRF_TOKEN)!)
    });
    if(req.url.endsWith("refresh-token")) {
      const refreshToken = this.tokenService.getRefreshToken();
      req = req.clone({
        headers: req.headers.set(environment.REFRESH_TOKEN , "Bearer " + refreshToken)
      });
    }
    if(!(req.url.endsWith("/auth/login") || req.url.endsWith("/auth/register") ) || !req.url.endsWith("refresh-token")){
      console.log("inside******############")
      const accessToken = this.tokenService.getAccessToken();
      req = req.clone({
        headers: req.headers.set(environment.AUTH_TOKEN , "Bearer "+accessToken)
      });
    }
    return next.handle(req).pipe(
      tap(
        event => {
          if(event.type===HttpEventType.Response){
             localStorage.setItem(environment.CSRF_TOKEN , event.headers.get(environment.CSRF_TOKEN)!);
          }
        },
        error => {
          console.log("eventeventevent")
          console.log(error instanceof HttpErrorResponse ,
            !req.url.includes('auth') ,
            !req.url.includes("oauth2"),error )
          if (error instanceof HttpErrorResponse &&
            !req.url.includes('auth') &&
            !req.url.includes("oauth2") &&
            (error.status === 401 || error.status === 500 )) {
            console.log("inside ===")
            return this.handle401Error(req, next);
          }
        }
      )
    )
  }

  private handle401Error(req: any, next: HttpHandler) {
     this.authService.refreshToken().subscribe(res=>{
        if(res.ok){
          console.log("refres response");
          this.tokenService.setUserData(res.body);
        }
      }, err => {
        console.log("logout")
        this.authService.logout();
      });
  }
}


