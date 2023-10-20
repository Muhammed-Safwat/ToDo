import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckEmailComponent } from './check-email/check-email.component';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DisplayMessageServiceService } from 'src/app/shared/services/display-message-service.service';
const routes: Routes =[
  { path:'login', component:LoginComponent },
  { path:'signup',component:SignupComponent },
  { path:'check-email' , component : CheckEmailComponent },
  { path:'verfiy/:token' , component:VerfiyEmailComponent },
  { path:'social/:accessToken/:refreshToken/:userId/:username/:firstName/:exp' , component:SocialAuthComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerfiyEmailComponent,
    SocialAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    CommonModule
  ],
  exports: [RouterModule]
  ,providers:[MessageService, DisplayMessageServiceService]
})
export class AuthModuleModule {}
