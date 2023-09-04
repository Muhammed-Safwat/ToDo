export class ToDo{
  title : string ;
  status : boolean ;
  discription : string ;

  constructor(title:string ,status : boolean ,  discription : string){
    this.title = title ;
    this.status = status;
    this.discription = discription;
  }

  setStatus(status : boolean){
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

}
