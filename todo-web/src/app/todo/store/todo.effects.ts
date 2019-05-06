import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TodoActionType} from './todo.actions';
import {concatMap, map} from 'rxjs/operators';
import * as TodoActions from '../store/todo.actions';

@Injectable()
export class TodoEffects {
  @Effect()
  public serverTodoAdd$ = this.actions$
    .pipe(
      ofType(TodoActionType.ServerAddTodo),
      map((action: any) => action.payload),
      concatMap(payload => [new TodoActions.AddTodo(payload)])
    );

  @Effect()
  public serverTodoUpdate$ = this.actions$
    .pipe(
      ofType(TodoActionType.ServerUpdateTodo),
      map((action: any) => action.payload),
      concatMap(payload => [new TodoActions.UpdateTodo(payload)])
    );

  @Effect()
  public serverTodoRemove$ = this.actions$
    .pipe(
      ofType(TodoActionType.ServerRemoveTodo),
      map((action: any) => action.payload),
      concatMap(payload => [new TodoActions.RemoveTodo(payload)])
    );

  constructor(
    private actions$: Actions
  ) {}
}
