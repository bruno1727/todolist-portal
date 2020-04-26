import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from './models/task.model';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private apiUrl = "http://localhost:54879/";
  private offline = true;/*
  private offline = false;//*/

  constructor(private http: HttpClient) {
    if(!this._getTasksLocalStorage())
      localStorage.setItem("tasks", JSON.stringify([]));
  }

  getTasks(): Observable<Task[]>{

    if(this.offline){
      return of(JSON.parse(this._getTasksLocalStorage()));
    } else{
      return this.http.get<Task[]>(this.apiUrl + "api/task");
    }

  }

  addTasks(tasks: string[]): Observable<any>{

    if(this.offline){
      this._addTasksLocalStorage(tasks);
      return of(true);
    } else{
      return this.http.post<any>(this.apiUrl + "api/task", {Tasks: tasks.map(t => ({description: t}) )});
    }
  }

  removeTasks(tasks: Task[]): Observable<Task[]>{

    const ids = tasks.map(t => t.id);

    if(this.offline){
      localStorage.setItem("tasks", JSON.stringify(JSON.parse(this._getTasksLocalStorage()).filter(t => ids.indexOf(t.id) == -1 )));
      return of(tasks);
    } else{
      return this.http.post<Task[]>(this.apiUrl + "api/task/delete", {TaskIds: ids});
    }
  }

  private _getTasksLocalStorage(){
    return localStorage.getItem("tasks");
  }

  private _addTasksLocalStorage(tasks: string[]){

    const tasksRequests = tasks.map(t => {
      return ({
        id: Math.round((Math.random()*1000)),
        description: t
      }) as Task
    });

    localStorage.setItem("tasks", JSON.stringify(JSON.parse(localStorage.getItem("tasks")).concat(tasksRequests)));
  }
}
