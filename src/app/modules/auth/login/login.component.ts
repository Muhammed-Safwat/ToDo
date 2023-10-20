import { DisplayMessageServiceService } from '../../../shared/services/display-message-service.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {AuthService} from "../../../shared/services/auth.service";

import {LoggedUser} from "../../../shared/modules/LoggedUser";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !:FormGroup;
  loggedUser !: LoggedUser;
  constructor(private authService : AuthService,
              public router : Router,
              private route: ActivatedRoute,
              private fromBuilder : FormBuilder,
              private displayMsg : DisplayMessageServiceService,
              private tokenStorage : TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
        username : ["",[Validators.required,Validators.email]],
        password : ["",[ Validators.required,Validators.minLength(3)]]
    });
  }

  login(){
    if(!this.loginForm.valid){
      this.displayMsg.displayErrorMesg("Your data not valid" ,'please enter valid details');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: HttpResponse<any>) => {
        if(res.ok){
          this.loggedUser = res.body;
          this.tokenStorage.setUserData(this.loggedUser);

           this.authService.reLongin(this.tokenStorage.getExpTime());
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          console.log(returnUrl)
          if (returnUrl && returnUrl !== '/') {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigate(['']);
          }
        }
      },
      error: (err) => {
        console.log("here is it ",err)
        this.displayMsg.displayErrorMesg("Login Failed",err.error.message);
      },
    });
  }

  githubLogin() {
    this.authService.loginWithGithub();
  }

  googleLogin() {
     this.authService.loginWithGoogle();
  }

}
