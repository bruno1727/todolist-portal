import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-include',
  templateUrl: './task-include.component.html',
  styleUrls: ['./task-include.component.scss']
})
export class TaskIncludeComponent implements OnInit {

  @Output() addTaskEvent = new EventEmitter<string>();

  task: string = "";

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addTask(){

    if(!this.task.trim().length){
      this._snackBar.open("Não é permitido inserir uma tarefa vazia");
    } else{
      this.addTaskEvent.emit(this.task);
      this.task = "";
    }

  }

}
