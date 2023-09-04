import { ToDo } from './../modules/ToDo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private todoArray !:  ToDo[] ;
  private doneArray !:  ToDo[] ;

  constructor() {
    this.todoArray = [];
    this.doneArray = [];
    this.initData();
  }

  initData(){
    let todo1 =  new ToDo('Implement Data Persistence' , false , 'One of the delayed tasks is implementing data persistence for the to-do list application.')  ;
    let todo2 =  new ToDo('Implement User Authentication' , false , ' Another important delayed task is adding user authentication to the to-do list application');
    let todo3 =  new ToDo('Improve UI/UX and Responsiveness' , true ,'The to-do list application has a basic user interface that lacks visual appeal and responsiveness. ');
    this.todoArray.push(todo1);
    this.todoArray.push(todo2);
    this.doneArray.push(todo3);
  }

  getTodo(title : string) : any{
    return this.todoArray.find(el => el.title === title);
  }

  getDone(title : string) : any{
    return this.doneArray.find(el => el.title === title);
  }

  createTodo(title : string) : ToDo{
    let todo = new ToDo(title , false , '');
    this.todoArray.push(todo);
    return todo;
  }

  getTodoList(){
    return this.todoArray;
  }

  getToDoneList(){
    return this.doneArray;
  }

  addToDo(value : ToDo){
    this.todoArray.push(value);
  }

  addToDone(value : ToDo){
    this.doneArray.push(value);
  }

  deleteFromTodo(title : string){
    this.todoArray = this.todoArray.filter(el => el.title != title );
  }

  deleteFromDone(title : string){
    this.doneArray = this.doneArray.filter(el => el.title != title);
  }

  moveToDone(title : string){
    this.addToDone(this.getTodo(title));
    this.deleteFromTodo(title);
  }

  returnToList(title:string){
    this.addToDo(this.getDone(title));
    this.deleteFromDone(title);
  }

  setFav(title : string){
    let todo  = this.getTodo(title);
    todo.setStatus(!todo.getStatus());
  }

}
