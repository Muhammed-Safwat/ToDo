import { ToDoService } from '../../../shared/services/to-do-service.service';
import {Component, EventEmitter, Input, ViewChild, ElementRef, OnInit, SimpleChanges, NgModule, Output} from '@angular/core';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,} from '@angular/cdk/drag-drop';
import { MessageService } from 'primeng/api';
import { ToDo } from '../../modules/ToDo';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: './cdk-drag-drop-connected-sorting-example.component.html',
  styleUrls: ['./cdk-drag-drop-connected-sorting-example.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag ,NgIf , NgClass ,NgStyle , FormsModule ],
})

export class CdkDragDropConnectedSortingExample implements OnInit{

  @Input() eventEmitter !: EventEmitter<string> ;
  @Output("editEvent") editEvent = new EventEmitter<ToDo>();
  @Input() completedEmmiter !: EventEmitter<ToDo> ;
  innerItem : any ;
  message !: string;

  constructor(public todoService : ToDoService , public messageService: MessageService){}

  ngOnInit(): void {
    this.subscribeToParentEmitter();
    this.subscribeToCompleateEmitter();
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log("---------------------------")
      this.todoService.toggleStatus(event.container.data[event.currentIndex].id, false).subscribe(
        success => {
          if (success) {
            this.messageService.add({ severity: 'success',
                                      summary: 'Returned to Todo List' ,
                                      detail: "You're closer to your goals than you think"});
          } else {
            this.messageService.add({ severity: 'error',
                                      summary: 'Error eccour',
                                      detail: 'Load Page and Try again'});
          }
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error',
                                      summary: "Load Page and Try again",
                                      detail: ''});
        }
      );
    }
    if(this.innerItem?.classList.contains('click-action')){
      this.innerItem.classList.remove('click-action');
    }
  }

  subscribeToParentEmitter(): void {
      this.eventEmitter.subscribe((data: string) => {
        this.todoService.createTodo(data);
      });
  }

  subscribeToCompleateEmitter() : void{
    this.completedEmmiter.subscribe((todo : ToDo) => {
      console.log(todo);
      this.moveToDone(todo.id);
    });
  }

  toggle(item : any){
    if(item.target.classList.contains('example-box')){
      this.innerItem = item.target ;
      item.target?.classList.toggle("click-action");
    }
  }

  moveToDone(id: any){
    this.todoService.toggleStatus(id,true).subscribe(
      success => {
        if (success) {
          this.messageService.add({ severity: 'success',
                                    summary: 'keep moving forward!' ,
                                    detail: "You're closer to your goals than you think"});
        } else {
          this.messageService.add({ severity: 'error',
                                    summary: 'Error eccour',
                                    detail: 'Load Page and Try again'});
        }
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error',
                                    summary: "",
                                    detail: 'Load Page and Try again'});
      }
    );
  }


  returnToList(id : any){
      this.todoService.toggleStatus(id,true).subscribe(
        success => {
          if (success) {
            this.messageService.add({ severity: 'success',
                                      summary: 'Returned to Todo List' ,
                                      detail: "You're closer to your goals than you think"});
          } else {
            this.messageService.add({ severity: 'error',
                                      summary: 'Error eccour',
                                      detail: 'Load Page and Try again'});
          }
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error',
                                      summary: "Load Page and Try again",
                                      detail: ''});
        }
      );
  }

  update(event : any){
    let id = event.target.closest(".example-box").querySelector('.hidden-input').value;
    this.editEvent.emit(this.todoService.getTodo(id));
  }



  delete(event : any){
    let tilte = event.target.closest(".example-box").querySelector('.hidden-input').value;
    this.todoService.deleteFromTodo(tilte).subscribe(
      success => {
        if (success) {
          this.messageService.add({ severity: 'success',
                                    summary: 'Item Deleted' ,
                                    detail: "You're closer to your goals than you think"});
        } else {
          this.messageService.add({ severity: 'error',
                                    summary: 'Error eccour',
                                    detail: 'Load Page and Try again'});
        }
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error',
                                    summary: "Load Page and Try again",
                                    detail: ''});
      }
    );
  }

  fav(event :any){
    let tilte = event.target.closest(".example-box").querySelector('.hidden-input').value;
    //this.todoService.setFav(tilte);
  }
}

