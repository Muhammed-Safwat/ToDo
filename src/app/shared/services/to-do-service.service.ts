import { ToDo } from './../modules/ToDo';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private todo !: any[] ;
  private done !: any[] ;

  constructor() {
    this.todo= [new ToDo('Implement Data Persistence' , false , [] ,'One of the delayed tasks is implementing data persistence for the to-do list application.') ,
    new ToDo('Implement User Authentication' , false , [] , ' Another important delayed task is adding user authentication to the to-do list application')];
    this.done= [new ToDo(' Improve UI/UX and Responsiveness' , true , [] ,'The to-do list application has a basic user interface that lacks visual appeal and responsiveness. ')];
  }
  getTodo(title : string){
    return this.todo.find(el =>el.title ==title);
  }
  getTodoList(){
    return this.todo;
  }
  getToDoneList(){
    return this.done;
  }
  setToDo(list :ToDo[]){
    this.todo=list;
  }
  setToDone(list :ToDo[]){
    this.todo=list;
  }
  addToDo(value : ToDo){
    this.todo.unshift(value);
  }






}
