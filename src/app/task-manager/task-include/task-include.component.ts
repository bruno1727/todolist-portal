import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-include',
  templateUrl: './task-include.component.html',
  styleUrls: ['./task-include.component.scss']
})
export class TaskIncludeComponent implements OnInit {

  @Output() addTaskEvent = new EventEmitter<string>();

  task: string;

  constructor() { }

  ngOnInit(): void {
  }

  addTask(){
    this.addTaskEvent.emit(this.task);
    this.task = "";
  }

}
