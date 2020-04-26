import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-task-include',
  templateUrl: './task-include.component.html',
  styleUrls: ['./task-include.component.scss']
})
export class TaskIncludeComponent implements OnInit {

  @Output() addTaskEvent = new EventEmitter<string>();

  @ViewChild("input") input: ElementRef;

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

  focus(){
    this.input.nativeElement.focus();
  }
}
