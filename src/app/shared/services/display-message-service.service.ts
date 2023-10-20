import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DisplayMessageServiceService {

  constructor(public messageService: MessageService ) {}

  displaySucssfulMesg(summary:string='' , detail :string=''){
    this.messageService.add({ severity: 'success',
                              summary: summary ,
                              detail: detail});
  }

  displayErrorMesg(summary:string = '' , detail  :string =''){
    this.messageService.add({ severity: 'error',
                              summary: summary ,
                              detail: detail});
  }

}
