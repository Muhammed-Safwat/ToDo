import { TokenStorageService } from './token-storage.service';
import { ToDo } from '../modules/ToDo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SuccessResponseHandler } from '../modules/SuccessResponseHandler';

import { Observable, map } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  prams: new HttpParams().set("_csrf",localStorage.getItem(environment.CSRF_TOKEN)!)
};


@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private todoArray !:  ToDo[] ;
  private doneArray !:  ToDo[] ;

  constructor(public http : HttpClient ,
              private userTokenService : TokenStorageService) {
    this.todoArray = [];
    this.doneArray = [];
  }

  getAllTodo(page=0 , size=16){
    const  id = this.userTokenService.getUserId();
    const options = {
      params: new HttpParams()
      .set('id',  id )
      .set("page", page)
      .set("size", size)
    };
    console.log("Get All Todo id == "+id);
    this.http.get('http://localhost:1600/todo' ,options).subscribe(
      (res : any)=>{
        this.todoArray = res.content ;
      },
      (err)=>{
        console.log("error from get All todo ==",err);
      }
    )
  }

  getAllDone(page=0 , size=16){
    const  id = this.userTokenService.getUserId();
    const options = {
      params: new HttpParams()
      .set('id',  id )
      .set("page", page)
      .set("size", size)
    };
    this.http.get('http://localhost:1600/todo/done' ,options).subscribe(
      (res : any)=>{
        this.doneArray = res.content ;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  createTodo(title : string) : ToDo{
    let  id = this.userTokenService.getUserId();
    let todo = new ToDo(title , false , '' , id);
    this.http.post<any>(environment.URL+'/todo', JSON.stringify(todo), httpOptions).subscribe(res=>{
      console.log(res);
      if(res.ok){
        this.todoArray.unshift(res.body);
      }
    }, err => {
      console.log(err);
    });
    return todo;
  }

  toggleStatus(id: number , key :boolean): Observable<boolean> {
    const options = {
      params: new HttpParams()
        .set('id', id.toString())
        .set('customerId', this.userTokenService.getUserId())
    };

    return this.http.delete<any>(environment.URL + "/todo/toggle", options)
      .pipe(
        map(res => {
          console.log(res);
          if (res.ok && key) {
            if (res.body.status === 'true') {
              this.removeFormTodoArray(id);
               this.doneArray.unshift(res.body);
            } else {
              this.removeFormDoneArray(id);

              this.todoArray.unshift(res.body);
            }
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*toggleStatus(id : number){
    const options = {
      params: new HttpParams()
      .set('id',  id )
      .set('customerId',localStorage.getItem(environment.USER_TOKEN)!)
    };
    this.http.delete<SuccessResponseHandler>(environment.URL+"/todo/toggle" ,options).subscribe( res =>{
      console.log(res);
      if(res.ok) {
        if(res.data.status=='true'){
          this.removeformTodoArray(id);
          this.doneArray.unshift(res.data);
        }else{
          this.removeformDoneArray(id);
          this.todoArray.unshift(res.data);
        }
      }
    });
  }
*/
  deleteFromTodo(id : number): Observable<boolean>{
    const options = {
      params: new HttpParams()
      .set('id',  id )
      .set('customerId',this.userTokenService.getUserId())
    };
    return this.http.delete<any>(environment.URL+"/todo" ,options)
    .pipe(
      map(res => {
        console.log(res);
        if (res.ok) {
          this.removeFormTodoArray(id);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  updateTodo(todo : ToDo): Observable<boolean> {
    return this.http.put<SuccessResponseHandler>(environment.URL + '/todo', JSON.stringify(todo), httpOptions)
      .pipe(
        map(res => {
          console.log(res);
          return res.ok;
        })
      );
  }

  getTodoList(){
    return this.todoArray;
  }

  getToDoneList() {
    return this.doneArray;
  }

  removeFormDoneArray(id : any){
    this.doneArray = this.doneArray.filter(el => el.id != id );
  }

  removeFormTodoArray(id : any){
    this.todoArray = this.todoArray.filter(el => el.id != id );
  }

  getTodo(id:any){
    return this.todoArray.find(el => el.id == id);
  }

}
