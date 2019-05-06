import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoSocketService} from './services/todo-socket.service';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromTodo from './store/todo.reducer';
import * as TodoActions from './store/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  private todoCreated$: Observable<any>;
  private todoUpdated$: Observable<any>;
  private todoDeleted$: Observable<any>;
  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromTodo.TodoState>,
    private todoSocketService: TodoSocketService
  ) {
    console.log('KOM IN BRAVO 1');
    this.todoCreated$ = this.todoSocketService.subscribeToMessage('todoCreated');
    this.todoUpdated$ = this.todoSocketService.subscribeToMessage('todoUpdated');
    this.todoDeleted$ = this.todoSocketService.subscribeToMessage('todoDeleted');
  }

  public ngOnInit(): void {
    this.todoCreated$
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((payload) => {

        this.store.dispatch(new TodoActions.AddTodo(payload));
      });

    this.todoUpdated$
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((payload) => {
        this.store.dispatch(new TodoActions.UpdateTodo(payload));
      });

    this.todoDeleted$
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((payload) => {
        this.store.dispatch(new TodoActions.RemoveTodo(payload));
      });
  }

  public ngOnDestroy(): void {
    console.log('BRAVO 1 UIT BOYS');
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
