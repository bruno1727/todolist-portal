import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from './models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private apiUrl = "http://localhost:54879/";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl + "api/task");
  }

  addTasks(tasks: string[]){
    return this.http.post(this.apiUrl + "api/task", {Tasks: tasks.map(t => ({description: t}) )});
  }

  removeTasks(tasks: Task[]): Observable<Task[]>{
    return this.http.post<Task[]>(this.apiUrl + "api/task/delete", {TaskIds: tasks.map(t => t.id)});
  }


}
