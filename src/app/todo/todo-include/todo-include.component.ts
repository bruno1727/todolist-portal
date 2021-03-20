import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
import { Todo } from '../models/todo.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-include',
  templateUrl: './todo-include.component.html',
  styleUrls: ['./todo-include.component.scss']
})
export class TodoIncludeComponent implements OnInit {

  @Output() addTodoEvent = new EventEmitter<string>();

  @ViewChild("input") input: ElementRef;

  @Input() todo: Todo = new Todo();
  @Input() disabled: boolean;
  @Input() formGroup: FormGroup;

  get description()  { return this.formGroup.get('description'); }

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.description.valueChanges.subscribe(data => {
      this.todo.description = data;
    })
  }

  addTodo(){

    if(!this.formGroup.valid){
      this._snackBar.open("Não é permitido inserir uma tarefa vazia");
    } else{
      this.addTodoEvent.emit(this.todo.description);
      this.description.setValue("");
    }

  }

  focus(){
    this.input.nativeElement.focus();
  }
}
