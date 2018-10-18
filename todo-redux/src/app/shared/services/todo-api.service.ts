import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoApiService {
  serviceUrl = 'localhost:3000';
  constructor(private http: HttpClient) {
  }

  public getTodos(): Observable<TodoModel[]> {
    return this.http.get(`${this.serviceUrl}/todos`);
  }

}
