import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_HAMMER_OPTIONS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { DeleteTodoRequest } from '../request/delete-todo.request';
import { IncludeTodoRequest } from '../request/include-todo.request';
import { TodoRequest } from '../request/todo.request';
import { TodoIncludeComponent } from '../todo-include/todo-include.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoService } from '../todo.service';
import { UpdateNotificationService } from '../update-notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  public selectAll = false;

  @ViewChild("list") list: TodoListComponent;
  @ViewChild("include") include: TodoIncludeComponent;

  todo: Todo = new Todo();

  formGroup: FormGroup;

  constructor(private _snackBar: MatSnackBar,
    private service: TodoService,
    private updateNotificationService: UpdateNotificationService) {


      this.formGroup = new FormGroup({
        'description': new FormControl('', {validators: Validators.required, updateOn: 'change'})
      })
     }

  
  ngOnInit(): void {
    this.loadTodos();

    this.service.updateSubject.subscribe(data => {
      this.loadTodos(function(){
        
      }.bind(this));
    })

    document.addEventListener('keydown', event => {
      if(event.keyCode == 46 && this.list.selectedTodos.length){
        this.removeTodos(true);
      } else if(event.keyCode == 40 && this.list.selectedTodos.length){
        console.log("down arrow!");
      }
    })

  }

  ngAfterViewInit() {
 }

  loadTodos(oncomplete?: any){
    this.service.get().subscribe(data => {
      data.filter(d => this.todos.map(t => t.id).indexOf(d.id) == -1 ).forEach(d => this.todos.push(Todo.of(d))); //add
      this.todos = this.todos.filter(t => data.map(d => d.id).indexOf(t.id) != -1); //remove

      this.service.lastUpdate = new Date;

      if(oncomplete)
        oncomplete();
    });
  }

  addTodo(todo: string){
    this._addTodos([todo]);
    this.include.focus();
    this.formGroup.reset();
  }

  private _addTodos(todos: string[]){
    this.service.add(
      ({
        todos: todos.map(t => ( {description: t } as TodoRequest ))
      } as IncludeTodoRequest )
    ).subscribe(data => {
      this._snackBar.open(todos.length + ' tarefa(s) adicionada(s)');
      this.loadTodos();
    })
  }

  removeTodos(valid: boolean){

    if(valid){
      this.service.delete( {todosIds: this.list.selectedTodos.map(t => t.id)} as DeleteTodoRequest).subscribe(data => {
        this.loadTodos();

        this._snackBar
          .open(this.list.selectedTodos.length + ' tarefa(s) removida(s)', "Desfazer", {
            duration: 3000
          }).onAction().subscribe(() => {
            this._addTodos(data.map(t => t.description));
          });
        });

        this.include.focus();
      }
  }

}
