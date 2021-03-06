import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { Observable, of} from 'rxjs';
import { LocalStorage } from './local-storage';
import { TodoRequest } from './request/todo.request';
import { DeleteTodoRequest } from './request/delete-todo.request';
import { IncludeTodoRequest } from './request/include-todo.request';
import { TodoResponse } from './response/todo.response';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = "http://localhost:54879/api/todo";

  constructor(private http: HttpClient) {
    if(!this._getTodosLocalStorage())
      localStorage.setItem("todos", JSON.stringify([]));
  }

  getTodos(): Observable<TodoResponse[]>{

    if(LocalStorage.isOffline()){
      return of(JSON.parse(this._getTodosLocalStorage()));
    } else{
      return this.http.get<TodoResponse[]>(this.apiUrl);
    }

  }

  addTodos(request: IncludeTodoRequest): Observable<any>{

    if(LocalStorage.isOffline()){
      this._addTodosLocalStorage(request.todos.map(t => t.description));
      return of(true);
    } else{
      return this.http.post<any>(this.apiUrl, request);
    }
  }

  removeTodos(request : DeleteTodoRequest): Observable<TodoResponse[]>{

    if(LocalStorage.isOffline()){
      let todosLocalStorage = JSON.parse(this._getTodosLocalStorage()).filter(t => request.todosIds.indexOf(t.id) == -1 );
      localStorage.setItem("todos", JSON.stringify(todosLocalStorage));
      return of(todosLocalStorage);
    } else{
      return this.http.post<Todo[]>(this.apiUrl + "/delete", request);
    }
  }

  private _getTodosLocalStorage(){
    return localStorage.getItem("todos");
  }

  private _addTodosLocalStorage(todos: string[]){

    const todosRequests = todos.map(t => {
      return ({
        id: Math.round((Math.random()*1000)),
        description: t
      }) as Todo
    });

    localStorage.setItem("todos", JSON.stringify(JSON.parse(localStorage.getItem("todos")).concat(todosRequests)));
  }
}
