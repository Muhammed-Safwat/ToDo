import { Component, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]
})
export class HomepageComponent implements OnInit {
  parentEmitter !: EventEmitter<string>  ;
  date : Date = new Date();
  tasks:number = 20 ;
  inputValue: string = '';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.parentEmitter = new EventEmitter<string>();
  }

  submitForm() {
    if(this.inputValue.length < 5){
      this.messageService.add({ severity: 'error', summary: 'InValid', detail: 'Tilte must be greater than 5 character'});
    }else{
      this.parentEmitter.emit(this.inputValue);
      this.inputValue='';
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
  }


}
