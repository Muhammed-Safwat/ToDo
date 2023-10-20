import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoggedUser} from "../../../shared/modules/LoggedUser";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css']
})
export class SocialAuthComponent {

  constructor(private router : Router ,
              private route: ActivatedRoute,
              private tokenStorage : TokenStorageService,
              private authService : AuthService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(prams => {
      const user = new LoggedUser(prams.get("username"),prams.get("firstName"),prams.get("userId"),
                                              prams.get("accessToken"),prams.get("refreshToken"),prams.get("exp"));
        this.tokenStorage.setUserData(user);
      this.authService.reLongin(this.tokenStorage.getExpTime())
       this.router.navigate(["/"])
    })
  }

}
