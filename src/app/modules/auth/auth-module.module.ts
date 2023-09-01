import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

const routes: Routes =[
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PasswordModule,
    FormsModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AuthModuleModule { }
