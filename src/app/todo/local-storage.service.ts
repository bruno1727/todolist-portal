import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoLocalStorage } from './models/todo-local-storage.model';
import { Todo } from './models/todo.model';
import { DeleteTodoRequest } from './request/delete-todo.request';
import { IncludeTodoRequest } from './request/include-todo.request';
import { TodoResponse } from './response/todo.response';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { 
    if(!this.get())
      localStorage.setItem("todos", JSON.stringify([]));
  }

  isOffline(): boolean{

    if(!localStorage.getItem("offline"))
        localStorage.setItem("offline", 'true');

    return localStorage.getItem("offline") == 'true';
  }

  setOffline(offline: boolean){
      localStorage.setItem('offline', offline ? 'true' : 'false');
  }

  get() : TodoResponse[]{
    return this._getTodosFromLocalStorage().map(l => new TodoResponse(l));
  }

  add(request: IncludeTodoRequest) : boolean{

    const todosRequests = request.todos.map(t => {
      return ({
        id: Math.round((Math.random()*1000)),
        description: t.description,
        creationDate: t.creationDate,
      }) as TodoLocalStorage
    });

    localStorage.setItem("todos", JSON.stringify(this._getTodosFromLocalStorage().concat(todosRequests)));

    return true;
  }

  delete(request : DeleteTodoRequest): TodoResponse[]{
    let todosLocalStorage = this._getTodosFromLocalStorage();
      localStorage.setItem("todos", JSON.stringify(todosLocalStorage.filter(t => request.todosIds.indexOf(t.id) == -1 )));
      return todosLocalStorage.filter(t => request.todosIds.indexOf(t.id) != -1 ).map(t => new TodoResponse(t));
  }

  private _getTodosFromLocalStorage() : TodoLocalStorage[]{
    return JSON.parse(localStorage.getItem("todos"));
  }
}
