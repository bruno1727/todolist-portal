import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-todo-include',
  templateUrl: './todo-include.component.html',
  styleUrls: ['./todo-include.component.scss']
})
export class TodoIncludeComponent implements OnInit {

  @Output() addTodoEvent = new EventEmitter<string>();

  @ViewChild("input") input: ElementRef;

  todo: string = "";

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addTodo(){

    if(!this.todo.trim().length){
      this._snackBar.open("Não é permitido inserir uma tarefa vazia");
    } else{
      this.addTodoEvent.emit(this.todo);
      this.todo = "";
    }

  }

  focus(){
    this.input.nativeElement.focus();
  }
}
