import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-exclude',
  templateUrl: './task-exclude.component.html',
  styleUrls: ['./task-exclude.component.scss']
})
export class TaskExcludeComponent implements OnInit {

  @Input() selectedTasks: string[];
  @Output() removeTasksEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  removeTasks(){
    this.removeTasksEvent.emit(true);
  }

}
