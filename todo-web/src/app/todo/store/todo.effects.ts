import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TodoActionType} from './todo.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class TodoEffects {
  @Effect({dispatch: false})
  public serverTodoAdd$ = this.actions$
    .pipe(
      ofType(TodoActionType.AddTodo),
      tap((payload) => console.log('Do something here as [AddTodo] effect', payload))
    );

  @Effect({dispatch: false})
  public serverTodoUpdate$ = this.actions$
    .pipe(
      ofType(TodoActionType.UpdateTodo),
      tap((payload) => console.log('Do something here as [UpdateTodo] effect', payload))
    );

  @Effect({dispatch: false})
  public serverTodoRemove$ = this.actions$
    .pipe(
      ofType(TodoActionType.RemoveTodo),
      tap((payload) => console.log('Do something here as [RemoveTodo] effect', payload))
    );

  constructor(
    private actions$: Actions
  ) {}
}
