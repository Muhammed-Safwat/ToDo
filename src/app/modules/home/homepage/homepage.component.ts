import { ToDoService } from './../../../shared/services/to-do-service.service';
import { Title } from '@angular/platform-browser';
import { Component, EventEmitter, OnDestroy, OnInit, Type } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToDo } from 'src/app/shared/modules/ToDo';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]
})
export class HomepageComponent implements OnInit ,OnDestroy  {

  parentEmitter !: EventEmitter<string>  ;
  completedEmmiter !: EventEmitter<ToDo>  ;
  date : Date = new Date();
  tasks = 2;
  inputValue: string = '';
  overlayVisible: boolean = false;

  activeTodo !: ToDo ;



  constructor(public messageService: MessageService , private todoService :ToDoService) {}

  ngOnInit(): void {
    this.parentEmitter = new EventEmitter<string>();
    this.completedEmmiter =  new EventEmitter<ToDo>();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  submitForm() {
    if(this.inputValue.length < 4){
      this.messageService.add({ severity: 'error', summary: 'InValid', detail: 'Tilte must be greater than 5 character'});
    }else{
      this.parentEmitter.emit(this.inputValue);
      this.inputValue='';
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
  }

  markCompleted() {
    this.completedEmmiter.emit(this.activeTodo);
    this.overlayVisible = false;
  }

  handleChildEvent(todo :any) {
    this.activeTodo = todo;
    console.log('Received from child:' +todo.title);
    this.openPopup();
  }

  openPopup() {
    this.overlayVisible = true;
  }

  closePopup(event :any) {
     if(event.target.classList.contains('overlay'))
        this.overlayVisible = false;
  }


}
