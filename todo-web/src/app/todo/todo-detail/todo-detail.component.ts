import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap,} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {switchMap, take} from 'rxjs/operators';
import {TodoModel} from '../../shared/models/todo.model';
import {TodoService} from '../services/todo.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  private selectedTodo$: Observable<TodoModel>;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private todoService: TodoService) {
  }

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
      .subscribe(() => {
        this.snackBar.open('Todo saved successfully', 'Dismiss', {
          duration: 2000
        });
      });
  }
}
