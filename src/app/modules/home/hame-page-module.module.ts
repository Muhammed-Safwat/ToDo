import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CdkDragDropConnectedSortingExample } from 'src/app/shared/components/cdk-drag-drop-connected-sorting-example/cdk-drag-drop-connected-sorting-example.component';

const routes: Routes =[
  {path:'', component:HomepageComponent}
];


@NgModule({
  declarations: [
     HomepageComponent,
    ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CdkDragDropConnectedSortingExample,
    FormsModule,
    ToastModule,
    CommonModule
  ],
  exports: [RouterModule]
})


export class HamePageModuleModule { }
