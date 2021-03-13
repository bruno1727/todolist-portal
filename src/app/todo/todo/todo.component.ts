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
      } else if(event.keyCode == 40 && this.list.selectedTodos.length){
        console.log("down arrow!");
      }
    })
  }

  ngAfterViewInit() {
 }

  loadTodos(){
    this.service.get().subscribe(data => {
      data.filter(d => this.todos.map(t => t.id).indexOf(d.id) == -1 ).forEach(d => this.todos.push(d)); //add
      this.todos = this.todos.filter(t => data.map(d => d.id).indexOf(t.id) != -1); //remove
    });
  }

  addTodo(todo: string){
    this._addTodos([todo]);
    this.include.focus();
  }

  private _addTodos(todos: string[]){
    this.service.add(
      ({
        todos: todos.map(t => ( {description: t, creationDate: new Date() } as TodoRequest ))
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
