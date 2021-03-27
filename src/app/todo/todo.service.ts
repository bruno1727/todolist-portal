import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { Observable, of, Subject} from 'rxjs';
import { TodoRequest } from './request/todo.request';
import { DeleteTodoRequest } from './request/delete-todo.request';
import { IncludeTodoRequest } from './request/include-todo.request';
import { TodoResponse } from './response/todo.response';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  private apiUrl = "http://localhost:54879/api/todo";

  updateSubject = new Subject();
  lastUpdate: Date;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  get(beginDate?: Date): Observable<TodoResponse[]>{

    let params:HttpParams= new HttpParams();
    if(beginDate)
      params = params.append('beginDate', beginDate.toISOString());

    if(this.localStorageService.isOffline()){
      return of(this.localStorageService.get());
    } else{
      return this.http.get<TodoResponse[]>(this.apiUrl, {params});
    }
  }

  getApelidos(searchText: string): Observable<string[]>{
    
    let params = new HttpParams().append('searchText', searchText);

    return this.http.get<string[]>(this.apiUrl + '/apelidos', {params});
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
