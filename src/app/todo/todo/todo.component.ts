import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoIncludeComponent } from '../todo-include/todo-include.component';
import { TodoRequest } from '../request/todo.request';
import { DeleteTodoRequest } from '../request/delete-todo.request';
import { IncludeTodoRequest } from '../request/include-todo.request';

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

  constructor(private _snackBar: MatSnackBar,
    private service: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();

    document.addEventListener('keydown', event => {
      if(event.keyCode == 46 && this.list.selectedTodos.length){
        this.removeTodos(true);
      }
    })
  }

  ngAfterViewInit() {
    this.include.focus();
 }

  loadTodos(){
    this.service.getTodos().subscribe(data => {
      this.todos = data.map(r => ({id: r.id, description: r.description} as Todo));
    });
  }

  addTodo(todo: string){
    this._addTodos([todo]);
    this.include.focus();
  }

  private _addTodos(todos: string[]){
    this.service.addTodos(
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
      this.service.removeTodos( {todosIds: this.list.selectedTodos.map(t => t.id)} as DeleteTodoRequest).subscribe(data => {
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
