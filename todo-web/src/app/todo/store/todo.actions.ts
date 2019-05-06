import { Action } from '@ngrx/store';
import { TodoModel } from '../../shared/models/todo.model';

export enum TodoActionType {
  AddTodo = '[Todo] Add Todo',
  RemoveTodo = '[Todo] Remove Todo',
  UpdateTodo = '[Todo] Update Todo',
  SelectTodo = '[Todo] Select Todo',
  SetTodos = '[Todo] Set Todos',
  ServerAddTodo = '[Todo] Server Add Todo',
  ServerUpdateTodo = '[Todo] Server Update Todo',
  ServerRemoveTodo = '[Todo] Server Remove Todo'
}

export class AddTodo implements Action {
  readonly type = TodoActionType.AddTodo;
  constructor(public payload: TodoModel) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionType.RemoveTodo;
  constructor(public payload: string) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionType.UpdateTodo;
  constructor(public payload: TodoModel) {}
}

export class SelectTodo implements Action {
  readonly type = TodoActionType.SelectTodo;
  constructor(public payload: TodoModel) {}
}

export class SetTodos implements Action {
  readonly type = TodoActionType.SetTodos;
  constructor(public payload: TodoModel[]) {}
}

export class ServerAddTodo implements Action {
  readonly type = TodoActionType.ServerAddTodo;
  constructor(public payload: TodoModel) {}
}

export class ServerRemoveTodo implements Action {
  readonly type = TodoActionType.ServerRemoveTodo;
  constructor(public payload: string) {}
}

export class ServerUpdateTodo implements Action {
  readonly type = TodoActionType.ServerUpdateTodo;
  constructor(public payload: TodoModel) {}
}

export type TodoActions = AddTodo | RemoveTodo | UpdateTodo | SelectTodo | SetTodos | ServerAddTodo | ServerRemoveTodo | ServerUpdateTodo;
