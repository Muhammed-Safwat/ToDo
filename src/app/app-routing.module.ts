import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/core/guards/auth-guard-service.service';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/hame-page-module.module').then(m=>m.HamePageModuleModule)
    ,canActivate:[AuthGuardService]
  },
  {
    path:'auth' , loadChildren: () => import('./modules/auth/auth-module.module').then(m=>m.AuthModuleModule)
  }
  ,{
    path:'**' , component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
