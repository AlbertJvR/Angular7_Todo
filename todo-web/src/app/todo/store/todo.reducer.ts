import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { TodoModel } from '../../shared/models/todo.model';
import { TodoActions, TodoActionType } from './todo.actions';

export interface TodoState {
  todos: TodoModel[];
}

const initialState: TodoState = {
  todos: []
};

export function todoReducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case (TodoActionType.AddTodo): {
      const newTodo = cloneDeep(action.payload);
      const updatedTodos = cloneDeep(state.todos);

      updatedTodos.push(newTodo);
      return {
        ...state as TodoState,
        todos: updatedTodos
      };
    }
    case (TodoActionType.RemoveTodo): {
      const currentTodos = cloneDeep(state.todos);
      const itemToRemoveIndex = currentTodos.findIndex((todoItem) => todoItem.id === action.payload);

      if (itemToRemoveIndex > -1) {
        currentTodos.splice(itemToRemoveIndex, 1);
      }

      return {
        ...state as TodoState,
        todos: currentTodos
      };
    }
    case (TodoActionType.UpdateTodo): {
      const currentTodos = cloneDeep(state.todos);
      const todoToUpdateIndex = currentTodos.findIndex((todo: TodoModel) => todo.id === action.payload.id);
      currentTodos[todoToUpdateIndex] = cloneDeep(action.payload);

      return {
        ...state as TodoState,
        todos: currentTodos
      };
    }
    case (TodoActionType.SelectTodo): {
      const updatedTodos = cloneDeep(state.todos);
      updatedTodos.map((todoItem) => {
        todoItem.selected = action.payload.id === todoItem.id;
        return todoItem;
      });

      return {
        ...state as TodoState,
        todos: updatedTodos
      };
    }
    case (TodoActionType.SetTodos): {
      return {
        ...state as TodoState,
        todos: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getTodoFeature = createFeatureSelector('todo');

export const getTodos = createSelector(
  getTodoFeature,
  (state: TodoState) => state.todos
);
