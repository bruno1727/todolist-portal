import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private apiUrl = "http://localhost:54879/";

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get(this.apiUrl + "api/task");
  }

  addTask(task: string){
    return this.http.post(this.apiUrl + "api/task", {task});
  }

  removeTask(task: string){
    return this.http.delete(this.apiUrl + "api/task/" + task);
  }


}
