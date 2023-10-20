
import { TokenStorageService } from '../../services/token-storage.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router:Router ,
              private tokenStorage : TokenStorageService,
              private authService : AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(!this.tokenStorage?.isRefreshTokenExpired() , this.tokenStorage.isTokenExpired())
    if(this.tokenStorage.isTokenExist() && !this.tokenStorage?.isRefreshTokenExpired()){
      console.log('11111111111111111111111')
      return true;
    }else {
      console.log("33333333333333333333")
       this.router.navigate(["auth/login"], {
        queryParams: {
          returnUrl: state.url,
        },
      });
      return false;
    }
  }

}
