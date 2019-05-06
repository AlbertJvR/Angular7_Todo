import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, take } from 'rxjs/operators';
import { TodoModel } from '../../shared/models/todo.model';
import { TodoService } from '../services/todo.service';
import * as fromTodo from '../store/todo.reducer';
import * as TodoActions from '../store/todo.actions';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  private selectedTodo$: Observable<TodoModel>;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService) { }

  public ngOnInit(): void {
    this.selectedTodo$ = this.route.paramMap
      .pipe(
        take(1),
        switchMap((params: ParamMap) => this.todoService.getTodoById(params.get('id')))
      );
  }

  public saveHandler(todo: TodoModel): void {
    this.todoService.updateTodo(todo.id, todo)
      .pipe(
        take(1)
      )
      .subscribe();
  }
}
