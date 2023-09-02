import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/core/guards/auth-guard-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
               AuthGuardService
             ],
  bootstrap: [AppComponent],
  exports:[BrowserModule]
})
export class AppModule { }
