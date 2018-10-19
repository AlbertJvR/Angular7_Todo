import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TodoModel } from '../../shared/models/todo.model';

@Injectable()
export class TodoApiService {
  serviceUrl = 'localhost:3000';
  constructor(private http: HttpClient) {
  }

  public getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.serviceUrl}/todos`);
  }

  public getTodoById(todoId: string): Observable<TodoModel> {
    return this.http.get<TodoModel>(`${this.serviceUrl}/todos?${todoId}`);
  }

  public createTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${this.serviceUrl}/todos`, todo);
  }

  public updateTodo(todoId: string, todo: TodoModel): Observable<TodoModel> {
    return this.http.patch<TodoModel>(`${this.serviceUrl}/todos?${todoId}`, todo);
  }

  public deleteTodo(todoId: string): Observable<TodoModel> {
    return this.http.delete<TodoModel>(`${this.serviceUrl}/todos?${todoId}`);
  }
}
