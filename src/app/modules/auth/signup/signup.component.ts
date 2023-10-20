import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DisplayMessageServiceService } from 'src/app/shared/services/display-message-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  singupFrom !: FormGroup;


  constructor(private formBuilder : FormBuilder ,
              private authService : AuthService,
              private router : Router,
              private displayMesg : DisplayMessageServiceService
            ) {}

  ngOnInit(): void {
    this.singupFrom = this.formBuilder.group({
      firstName : ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(16)]],
      lastName :  ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(16)]],
      username :  ["", [Validators.required , Validators.email]],
      password :  ["", [Validators.required]]
    });
  }

  singup(){
    if(!this.singupFrom.valid){
      this.displayMesg.displayErrorMesg("Your data not valid" ,'please enter valid details');
       return ;
    }
    this.authService.register(this.singupFrom.value).subscribe(res =>{
      if(res.ok)
        this.router.navigate(['auth/check-email']);
    },
    err => {
      this.displayMesg.displayErrorMesg(err.error.message ,"please try again")
    }
    );
  }

  googleSignup() {
    this.authService.loginWithGoogle();
  }

  githubSignup() {
    this.authService.loginWithGithub();
  }



}
