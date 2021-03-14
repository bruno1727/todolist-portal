import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-include',
  templateUrl: './todo-include.component.html',
  styleUrls: ['./todo-include.component.scss']
})
export class TodoIncludeComponent implements OnInit {

  @Output() addTodoEvent = new EventEmitter<string>();

  @ViewChild("input") input: ElementRef;

  @Input() todo: Todo = new Todo();

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  addTodo(){

    if(!this.todo.description.trim().length){
      this._snackBar.open("Não é permitido inserir uma tarefa vazia");
    } else{
      this.addTodoEvent.emit(this.todo.description);
      this.todo.description = "";
    }

  }

  focus(){
    this.input.nativeElement.focus();
  }
}
