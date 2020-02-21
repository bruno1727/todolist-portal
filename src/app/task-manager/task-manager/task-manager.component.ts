import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: string[] = [];

  @ViewChild("list") list: TaskListComponent;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addTask(task: string){
    this.tasks.push(task);
    this._snackBar.open('Tarefa adicionada');
  }

  removeTasks(valid: boolean){

    if(valid){
      this.tasks = this.tasks.filter(t => !this.list.selectedTasks.includes(t));
      this._snackBar.open(this.list.selectedTasks.length + ' tarefa(s) removida(s)');
    }
  }

}
