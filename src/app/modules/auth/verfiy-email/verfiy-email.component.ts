import { SuccessResponseHandler } from './../../../shared/modules/SuccessResponseHandler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import {TokenStorageService} from "../../../shared/services/token-storage.service";

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.css']
})
export class VerfiyEmailComponent  {

  token : any ;
  error : any ;

  constructor(private router : Router ,
              private route: ActivatedRoute,
              private tokenStorage : TokenStorageService,
              private authService : AuthService,
              ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.authService.activateAccount(token).subscribe(
          (res) => {
            this.authService.reLongin(this.tokenStorage.getExpTime())
            this.router.navigate(['']);
          },
          error => {
            this.error =error;
          }
        );
      } else {
        console.error('Token not provided.');
      }
    });
  }
}


