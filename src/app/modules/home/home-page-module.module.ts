import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CdkDragDropConnectedSortingExample } from 'src/app/shared/components/cdk-drag-drop-connected-sorting-example/cdk-drag-drop-connected-sorting-example.component';
import { MessageService } from 'primeng/api';
import { DisplayMessageServiceService } from 'src/app/shared/services/display-message-service.service';
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
    CommonModule,
  ],
  exports: [RouterModule],
  providers:[MessageService, DisplayMessageServiceService]
})

export class HomePageModuleModule {}
