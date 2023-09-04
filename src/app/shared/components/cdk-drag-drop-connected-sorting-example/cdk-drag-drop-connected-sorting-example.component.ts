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
      if(event.previousContainer.id=='cdk-drop-list-0'){
        this.messageService.add({ severity: 'success', summary: ' keep moving forward!' , detail: "You're closer to your goals than you think"});
      }
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
      this.todoService.moveToDone(todo.title);
      this.messageService.add({ severity: 'success', summary: 'keep moving forward!' , detail: "You're closer to your goals than you think"});
    });
  }

  toggle(item : any){
    if(item.target.classList.contains('example-box')){
      this.innerItem = item.target ;
      item.target?.classList.toggle("click-action");
    }
  }

  moveToDone(title: string){
    this.todoService.moveToDone(title);
    this.messageService.add({ severity: 'success', summary: 'keep moving forward!' , detail: "You're closer to your goals than you think"});
  }

  returnToList(title:string){
    this.todoService.returnToList(title);
  }

  edit(event : any){
    let tilte = event.target.closest(".example-box").querySelector('.hidden-input').value;
    this.editEvent.emit(this.todoService.getTodo(tilte));
  }

  delete(event : any){
    let tilte = event.target.closest(".example-box").querySelector('.hidden-input').value;
    this.todoService.deleteFromTodo(tilte);
  }

  fav(event :any){
    let tilte = event.target.closest(".example-box").querySelector('.hidden-input').value;
    this.todoService.setFav(tilte);
  }
}

