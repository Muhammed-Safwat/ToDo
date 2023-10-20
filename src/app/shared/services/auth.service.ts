import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { SuccessResponseHandler } from '../modules/SuccessResponseHandler';

import {Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.URL;
  tokenExpirationTimer :any;
  interval : any;

  constructor(private httpClient : HttpClient , public router : Router ,
              private  tokenService : TokenStorageService){
  }

  login(user : object): Observable<any> {
    const json = JSON.stringify(user);
    return this.httpClient.post(this.apiUrl + "/auth/login" , json , httpOptions);
  }

  register(user : object): Observable<any> {
    const json = JSON.stringify(user);
    return this.httpClient.post(this.apiUrl + "/auth/register" , json , httpOptions);
  }

  logout(): void {
    localStorage.clear();
    clearTimeout(this.tokenExpirationTimer);
    clearInterval(this.interval);
    this.router.navigate(['/auth/login']);
  }

  activateAccount(token: any) {
    console.log(this.apiUrl+"/auth/confirm?token="+token)

    const options = {
      params: new HttpParams()
        .set('token', token)
    };
    return this.httpClient.get<SuccessResponseHandler>(environment.URL+"/auth/confirm?token="+token) ;
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(environment.URL+"/auth/refresh-token",{});
  }

  loginWithGithub()  {
    window.location.href = (environment.URL+"/oauth2/authorize/github");
  }

  loginWithGoogle(){
     window.location.href = (environment.URL+'/oauth2/authorize/google');
  }

  reLongin(expirationDuration: number) {
     this.interval =  setInterval(() => {
       this.refreshToken().subscribe(res =>{
         if(res.ok){
           this.tokenService.setUserData(res.body);
         }
       },err=>{
          this.logout();
       });
    }, expirationDuration );
  }


}
