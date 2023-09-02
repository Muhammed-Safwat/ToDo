import { ToDoService } from '../../../shared/services/to-do-service.service';
import {Component, EventEmitter, Input, ViewChild, ElementRef, OnInit, SimpleChanges, NgModule, Output} from '@angular/core';
import {NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
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

  @ViewChild('todoList') todoList !: ElementRef<HTMLDivElement>;
  @Input() eventEmitter !: EventEmitter<string> ;
  @Output("editEvent") editEvent = new EventEmitter<ToDo>();
  @Input() completedEmmiter !: EventEmitter<ToDo> ;

  innerItem : any ;
  message !: string;
  todo !: ToDo[] ;
  done !: ToDo[] ;


  constructor(private todoService : ToDoService ,
              public messageService: MessageService){}

  ngOnInit(): void {
    this.todo  = this.todoService.getTodoList();
    this.done  = this.todoService.getToDoneList();
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
    this.testData();
  }

  subscribeToParentEmitter(): void {
      this.eventEmitter.subscribe((data: string) => {
        this.todo.unshift(new ToDo(data, false ,[] , ''));
      });
  }

  subscribeToCompleateEmitter() : void{
    this.completedEmmiter.subscribe((todo : ToDo) => {
      this.done.unshift(todo);
      this.todo =this.todo.filter(el => el.title != todo.title);
      this.messageService.add({ severity: 'success', summary: 'keep moving forward!' , detail: "You're closer to your goals than you think"});
    });
  }

  toggle(item : any){
    if(item.target.classList.contains('example-box')){
      this.innerItem = item.target ;
      item.target?.classList.toggle("click-action");
    }
  }

  moveToDone(tilte: string){
    let todoEle !: ToDo ;
    let newToDo :ToDo[] = [] ;
    for(let i =0 ;i<this.todo.length ; i++){
      if(this.todo[i].title !== tilte){
        newToDo.unshift(this.todo[i]);
      }else {
        todoEle = this.todo[i];
      }
    }
    this.done.unshift(todoEle);
    this.todo = newToDo;
    this.todoService.setToDo(newToDo);
    this.messageService.add({ severity: 'success', summary: 'keep moving forward!' , detail: "You're closer to your goals than you think"});
  }

  returnToList(title:string){
    let doneEle !: ToDo ;
    let newDone  : ToDo [] = [] ;
    for(let i =0 ;i<this.done.length ; i++){
      if(this.done[i].title !== title){
        newDone.unshift(this.done[i]);
      }else {
        doneEle = this.done[i];
      }
    }
    this.todo.unshift(doneEle);
    this.done = newDone;
    this.todoService.setToDone(newDone);
  }

  testData(){
    console.log('Notifay Service ----------- ');
    console.log('Todo:', this.todo);
    console.log('Done:', this.done);
    console.log('Todo Service:', this.todoService.getTodoList());
    console.log('Done Service:', this.todoService.getToDoneList());
  }

  edit(event : any){
    console.log('Notifay Service ----------- ');
    let tilte = event.target.closest(".example-box").querySelector('.hiddne-input').value;
    this.editEvent.emit(this.todoService.getTodo(tilte));
  }

  delete(event : any){
    console.log('Notifay Service ----------- ');
    let tilte = event.target.closest(".example-box").querySelector('.hiddne-input').value;
    this.todo = this.todo.filter(el => el.title != tilte);
    this.todoService.setToDo(this.todo);
    this.testData();
  }

  fav(event :any){
    console.log('Notifay Service ----------- ');
    let tilte = event.target.closest(".example-box").querySelector('.hiddne-input').value;
    let todo = this.todoService.getTodo(tilte);
    if(todo)
      todo.setStatus(!todo.getStatus());
    this.testData();
  }

}

