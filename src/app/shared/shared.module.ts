import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CdkDragDropConnectedSortingExample } from './components/cdk-drag-drop-connected-sorting-example/cdk-drag-drop-connected-sorting-example.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
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
    CdkDragDropConnectedSortingExample,
    RadioButtonModule
  ],
  exports: [
            RouterModule,
            HeaderComponent,
            FooterComponent,
            CustomDatePipe,
            CdkDragDropConnectedSortingExample
          ]
})
export class SharedModule { }
