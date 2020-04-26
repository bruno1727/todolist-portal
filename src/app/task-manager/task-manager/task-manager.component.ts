import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagerService } from '../task-manager.service';
import { Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskIncludeComponent } from '../task-include/task-include.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: Task[] = [];
  public selectAll = false;

  @ViewChild("list") list: TaskListComponent;
  @ViewChild("include") include: TaskIncludeComponent;

  constructor(private _snackBar: MatSnackBar,
    private service: TaskManagerService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.include.focus();
 }

  loadTasks(){
    this.service.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addTask(task: string){
    this._addTasks([task]);
  }

  private _addTasks(tasks: string[]){
    this.service.addTasks(tasks).subscribe(data => {
      this._snackBar.open(tasks.length + ' tarefa(s) adicionada(s)');
      this.loadTasks();
    })
  }

  removeTasks(valid: boolean){

    if(valid){
      this.service.removeTasks(this.list.selectedTasks).subscribe(data => {
        this.loadTasks();

        this._snackBar
          .open(this.list.selectedTasks.length + ' tarefa(s) removida(s)', "Desfazer", {
            duration: 3000
          }).onAction().subscribe(() => {
            this._addTasks(data.map(t => t.description));
          });
        });
      }
  }

}
