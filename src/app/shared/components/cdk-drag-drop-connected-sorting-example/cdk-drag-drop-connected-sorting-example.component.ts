import { RadioButtonModule } from 'primeng/radiobutton';
import {Component, EventEmitter, Input, ViewChild, ElementRef, OnInit, SimpleChanges} from '@angular/core';
import {NgFor ,} from '@angular/common';
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
  imports: [CdkDropList, NgFor, CdkDrag],
})
export class CdkDragDropConnectedSortingExample implements OnInit{
  @ViewChild('todoList') todoList !: ElementRef<HTMLDivElement>;
  @Input() eventEmitter !: EventEmitter<string> ;
  innerItem : any ;
  message !: string;


  todo = ['Go To Gym', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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
    if(this.innerItem.classList.contains('click-action')){
      this.innerItem.classList.remove('click-action');
    }
  }

  subscribeToParentEmitter(): void {
      this.eventEmitter.subscribe((data: string) => {
        this.todo.unshift(data);
      });
  }

  toggle(item : any){
    if(item.target.classList.contains('example-box')){
      this.innerItem = item.target ;
      item.target.classList.toggle("click-action");
    }
  }

  moveToDone(message: any){
    console.log(message.innerText)
    this.done.push(message.innerText);
  }
}
