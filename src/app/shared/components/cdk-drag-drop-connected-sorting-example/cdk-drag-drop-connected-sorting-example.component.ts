import { ToDoService } from '../../../shared/services/to-do-service.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import {Component, EventEmitter, Input, ViewChild, ElementRef, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgFor ,} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: './cdk-drag-drop-connected-sorting-example.component.html',
  styleUrls: ['./cdk-drag-drop-connected-sorting-example.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag , NgClass],
})
export class CdkDragDropConnectedSortingExample implements OnInit{

  @ViewChild('todoList') todoList !: ElementRef<HTMLDivElement>;
  @Input() eventEmitter !: EventEmitter<string> ;

  innerItem : any ;
  message !: string;

  todo = this.todoService.getTodo();
  done = this.todoService.getToDone();

  constructor(private todoService : ToDoService ){}

  ngOnInit(): void {
    this.subscribeToParentEmitter();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if(this.innerItem?.classList.contains('click-action')){
      this.innerItem.classList.remove('click-action');
    }
  }

  subscribeToParentEmitter(): void {
      this.eventEmitter.subscribe((data: string) => {
        this.todo.unshift(data);
      });
  }

  toggle(item : any){
    if(item.target?.classList.contains('example-box')){
      this.innerItem = item.target ;
      item.target?.classList.toggle("click-action");
    }
  }

  moveToDone(message: any){
    this.todo = this.todo.filter(value => value !== message.innerText);
    this.todoService.setToDo(this.todo);
    this.done.unshift(message.innerText);
  }

  returnToList(message:any){
    this.done = this.done.filter(value => value !== message.innerText);
    this.todoService.setToDone(this.done);
    this.todo.unshift(message.innerText);
  }

  testData(){
    console.log('Todo:', this.todo);
    console.log('Done:', this.done);
    console.log('Todo Service:', this.todoService.getTodo());
    console.log('Done Service:', this.todoService.getToDone());
  }
}

