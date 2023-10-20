export class ToDo{
  id !: number;
  title : string ;
  status : boolean ;
  description : string ;
  customerId : string;
  constructor(title:string ,status : boolean ,  description : string , customerId :string){
    this.title = title ;
    this.status = status;
    this.description = description;
    this.customerId = customerId;
  }

  setStatus(status : boolean){
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

}
