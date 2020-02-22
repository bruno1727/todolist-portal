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
    this._snackBar.open('1 tarefa(s) adicionada(s)');
  }

  removeTasks(valid: boolean){

    if(valid){
      let temp = this.list.selectedTasks;
      this.tasks = this.tasks.filter(t => !this.list.selectedTasks.includes(t));
      this._snackBar
        .open(this.list.selectedTasks.length + ' tarefa(s) removida(s)', "Desfazer", {
          duration: 3000
        }).onAction().subscribe(() => {
          temp.forEach(t => this.tasks.push(t));
        });
    }
  }

}
