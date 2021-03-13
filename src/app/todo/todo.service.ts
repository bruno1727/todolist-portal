import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { Observable, of} from 'rxjs';
import { TodoRequest } from './request/todo.request';
import { DeleteTodoRequest } from './request/delete-todo.request';
import { IncludeTodoRequest } from './request/include-todo.request';
import { TodoResponse } from './response/todo.response';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  private apiUrl = "http://localhost:54879/api/todo";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  get(): Observable<TodoResponse[]>{

    if(this.localStorageService.isOffline()){
      return of(this.localStorageService.get());
    } else{
      return this.http.get<TodoResponse[]>(this.apiUrl);
    }
  }

  add(request: IncludeTodoRequest): Observable<any>{
    if(this.localStorageService.isOffline()){
      return of(this.localStorageService.add(request));
    } else{
      return this.http.post<any>(this.apiUrl, request);
    }
  }

  delete(request : DeleteTodoRequest): Observable<TodoResponse[]>{

    if(this.localStorageService.isOffline()){
      return of(this.localStorageService.delete(request));      
    } else{
      return this.http.post<TodoResponse[]>(this.apiUrl + "/delete", request);
    }
  }
}
