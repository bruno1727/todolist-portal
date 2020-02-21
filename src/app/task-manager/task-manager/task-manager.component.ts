import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: string[] = [];

  @ViewChild("list") list: TaskListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  addTask(task: string){
    this.tasks.push(task);
    console.log(this.tasks);
  }

  removeTasks(valid: boolean){
    this.tasks = this.tasks.filter(t => !this.list.selectedTasks.includes(t));
    console.log(this.tasks);
  }

}
