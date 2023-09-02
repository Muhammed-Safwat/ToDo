import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService ,public router : Router ,private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  login(){
    if(this.authService.login()){
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
        console.log(returnUrl)
      } else {
        console.log("else route")
        this.router.navigate([''])
      }
    }
  }

}
