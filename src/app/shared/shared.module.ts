import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ToDoService } from './services/to-do-service.service';
import { AccordionModule } from 'primeng/accordion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainInterceptor } from './core/interceptors/main-interceptor';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

const routes: Routes =[];
@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    CustomDatePipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    RadioButtonModule,
    AccordionModule,
    HttpClientModule
  ],
  exports: [
            RouterModule,
            HeaderComponent,
            FooterComponent,
            CustomDatePipe,
            AccordionModule,
  ],
  providers :[
    ToDoService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MainInterceptor,
      multi:true
    }
  ]
})
export class SharedModule { }
