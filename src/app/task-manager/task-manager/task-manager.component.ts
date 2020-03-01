import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagerService } from '../task-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: string[] = [];

  @ViewChild("list") list: TaskListComponent;

  constructor(private _snackBar: MatSnackBar,
    private service: TaskManagerService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.service.getTasks().subscribe(data => {
      this.tasks = data as any;
    });
  }

  selectAll(){
    this.list.selectAll();
  }

  addTask(task: string){
    this.service.addTask(task).subscribe(data => {
      this._snackBar.open('1 tarefa(s) adicionada(s)');
      this.loadTasks();
    })
  }

  removeTasks(valid: boolean){

    if(valid){
      let temp = this.list.selectedTasks;
      this.list.selectedTasks.forEach(t => {
        this.service.removeTask(t).subscribe(data => {
          this.loadTasks();
        })
      });
      //aqui tem risco de ser executado antes de acabar o request
      this._snackBar
        .open(this.list.selectedTasks.length + ' tarefa(s) removida(s)', "Desfazer", {
          duration: 3000
        }).onAction().subscribe(() => {
          temp.forEach(t => this.addTask(t));
        });
    }
  }

}
