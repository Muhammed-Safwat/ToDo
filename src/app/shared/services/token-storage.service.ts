import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {LoggedUser} from "../modules/LoggedUser";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private  jwtHelperService : JwtHelperService) { }
  getAccessToken() :string{
    const userData = JSON.parse(localStorage.getItem(environment.AUTH_USER)!);
    return userData?.accessToken ;
  }
  getRefreshToken():string{
    const userData = JSON.parse(localStorage.getItem(environment.AUTH_USER)!);
    return userData?.refreshToken ;
  }

  setUserData(loggedUser : LoggedUser) {
    localStorage.setItem(environment.AUTH_USER , JSON.stringify(loggedUser));
  }

  getUserId():string {
    const userData = JSON.parse(localStorage.getItem(environment.AUTH_USER)!);
    return userData?.userId;
  }

  isTokenExist() {
    return localStorage.getItem(environment.AUTH_USER) != null;
  }
  getExpTime() :any{
    const userData = JSON.parse(localStorage.getItem(environment.AUTH_USER)!);
    return new Date(userData.expirationDate).getTime() - new Date().getTime();
  }

  isRefreshTokenExpired(): boolean {
    const refreshToken = JSON.parse(localStorage.getItem(environment.AUTH_USER)!)?.refreshToken;
    console.log("isRefreshTokenExpired(): boolean ===> ",refreshToken)
    console.log(this.jwtHelperService.isTokenExpired(refreshToken))
    return <boolean> this.jwtHelperService.isTokenExpired(refreshToken);
  }
  isTokenExpired(): boolean {
    const accessToken = JSON.parse(localStorage.getItem(environment.AUTH_USER)!)?.accessToken;
    console.log("isTokenExpired(): boolean  ===> ",accessToken)
    return <boolean> this.jwtHelperService.isTokenExpired(accessToken);
  }

}
