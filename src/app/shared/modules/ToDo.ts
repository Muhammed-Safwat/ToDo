export class ToDo{
  title : string ;
  status : boolean ;
  steps : string[];
  discription : string ;

  constructor(title:string ,status : boolean , steps:string [] , discription : string){
    this.title = title ;
    this.status = status;
    this.steps = steps;
    this.discription = discription;
  }

  setStatus(status : boolean){
    this.status = status;
  }
  getStatus(){
    return this.status;
  }

}
