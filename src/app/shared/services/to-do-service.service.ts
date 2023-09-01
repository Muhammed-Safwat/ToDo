import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
/*
  todo = ['Go To Gym', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
*/
  private todo: string[] = [];
  private done: string[] = [];

  constructor() { }
  getTodo(){
    return this.todo;
  }
  getToDone(){
    return this.done;
  }
  setToDo(list :string[]){
    this.todo=list;
  }
  setToDone(list :string[]){
    this.todo=list;
  }
  addToDo(value : string){
    this.todo.unshift(value);
  }

  addToDone(value : string){
    this.done.unshift(value);
  }

  deleteFromTodo(value : string){
     this.todo = this.done.filter(val =>{
      console.log(val)
      return  val !== value;
     });
  }

  delteFromDone(value : string){
    this.done = this.done.filter(val => val !== value);
  }

  formToDoToDone(value : string){
    this.deleteFromTodo(value);
    this.addToDone(value);
  }

  fromDoneToToDo(value : string){
    this.delteFromDone(value);
    this.addToDo(value);
  }
}
