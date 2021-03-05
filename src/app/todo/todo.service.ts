import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { Observable, of} from 'rxjs';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = "http://localhost:54879/api/todo";

  constructor(private http: HttpClient) {
    if(!this._getTodosLocalStorage())
      localStorage.setItem("todos", JSON.stringify([]));
  }

  getTodos(): Observable<Todo[]>{

    if(LocalStorage.isOffline()){
      return of(JSON.parse(this._getTodosLocalStorage()));
    } else{
      return this.http.get<Todo[]>(this.apiUrl);
    }

  }

  addTodos(todos: string[]): Observable<any>{

    if(LocalStorage.isOffline()){
      this._addTodosLocalStorage(todos);
      return of(true);
    } else{
      return this.http.post<any>(this.apiUrl, {Todos: todos.map(t => ({description: t}) )});
    }
  }

  removeTodos(todos: Todo[]): Observable<Todo[]>{

    const ids = todos.map(t => t.id);

    if(LocalStorage.isOffline()){
      localStorage.setItem("todos", JSON.stringify(JSON.parse(this._getTodosLocalStorage()).filter(t => ids.indexOf(t.id) == -1 )));
      return of(todos);
    } else{
      return this.http.post<Todo[]>(this.apiUrl + "/delete", {TodosIds: ids});
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
