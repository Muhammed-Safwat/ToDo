import { ToDoService } from './../../../shared/services/to-do-service.service';

import { Component, EventEmitter, OnDestroy, OnInit, Type } from '@angular/core';
import { ToDo } from 'src/app/shared/modules/ToDo';
import { DisplayMessageServiceService } from 'src/app/shared/services/display-message-service.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DisplayMessageServiceService]
})
export class HomepageComponent implements OnInit {

  parentEmitter !: EventEmitter<string>  ;
  completedEmmiter !: EventEmitter<ToDo>  ;
  date : Date = new Date();
  tasks = 2;
  inputValue: string = '';
  overlayVisible: boolean = false;
  activeTodo !: ToDo ;

  constructor(public messageService : DisplayMessageServiceService ,
              private todoService :ToDoService) {}

  ngOnInit(): void {
    this.parentEmitter = new EventEmitter<string>();
    this.completedEmmiter =  new EventEmitter<ToDo>();
    this.todoService.getAllTodo();
    this.todoService.getAllDone();
  }

  submitForm() {
    if(this.inputValue.length < 4){
      this.messageService.displayErrorMesg("Not Valid",'Tilte must be greater than 5 character');
    }else{
      this.parentEmitter.emit(this.inputValue);
      this.messageService.displaySucssfulMesg("Success",this.inputValue+" Added");
      this.inputValue='';
    }
  }

  markCompleted() {
    this.completedEmmiter.emit(this.activeTodo);
    this.overlayVisible = false;
  }

  handleChildEvent(todo :any) {
    this.activeTodo = todo;
    this.openPopup();
  }

  openPopup() {
    this.overlayVisible = true;
  }

  closePopup(event :any) {
      if(event.target.classList.contains('overlay')){
        console.log(this.activeTodo.description);
        this.todoService.updateTodo(this.activeTodo).subscribe(
          success => {
            if (success) {
              this.messageService.displaySucssfulMesg('keep moving forward!' ,
                                                      "You're closer to your goals than you think" );
            } else {
              this.messageService.displaySucssfulMesg('Error eccour' ,
                                                      "Load Page and Try again");
            }
          },
          error => {
            console.log(error);
            this.messageService.displaySucssfulMesg(error.error.message,
                                                    "Load Page and Try again");
          }
        );
        this.overlayVisible = false;
      }

    }

}
