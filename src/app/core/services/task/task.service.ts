import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task, TaskList } from '../../../pages/task/models/task';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  constructor() { }

  createTask(body:Task): Observable<TaskList>{
    return this.http.post<TaskList>(`${environment.apiUrl}/todos`, body);
  }
  updateTask(id:number, body:Task): Observable<TaskList>{
    return this.http.put<TaskList>(`${environment.apiUrl}/todos/${id}`, body );
  }
  deleteTask(id:number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`);
  }
  getAllTask(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${environment.apiUrl}/todos`);
  }

}
