import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { TodoModel } from '../../shared/models/todo.model';
import { TodoService } from '../services/todo.service';
import * as fromTodo from '../store/todo.reducer';
import * as TodoActions from '../store/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('todoText') todoTextBox: ElementRef;

  public todos$: Observable<TodoModel[]>;

  constructor(
    private store: Store<fromTodo.TodoState>,
    private router: Router,
    private todoService: TodoService) {
      this.todos$ = store.pipe(
        select(fromTodo.getTodos)
      ) as Observable<TodoModel[]>;
  }

  public ngOnInit(): void {
    this.todoService.getTodos()
      .pipe(
        take(1)
      )
      .subscribe((data: TodoModel[]) => this.store.dispatch(new TodoActions.SetTodos(data)));
  }

  public addTodoHandler(todoText: string): void {
    const newTodo: TodoModel = new TodoModel(
      null,
       todoText,
      false,
      false);

    this.todoService.createTodo(newTodo)
      .subscribe((todoItem: TodoModel) => {
        console.log(todoItem);
        newTodo.id = todoItem.id;
        this.store.dispatch(new TodoActions.AddTodo(newTodo));
      });

    this.todoTextBox.nativeElement.value = '';
  }

  public itemSelectedHandler(item: TodoModel): void {
    this.store.dispatch(new TodoActions.SelectTodo(item));
  }

  public viewTodoHandler(): void {
    this.todos$
      .pipe(take(1))
      .subscribe((items: TodoModel[]) => {
        const selectedTodoIndex = items.findIndex((todoItem) => todoItem.selected);
        this.router.navigate(['/todos/' + items[selectedTodoIndex].id]);
      });
  }

  public completeTodoHandler(): void {
    this.todos$
      .pipe(take(1))
      .subscribe((items: TodoModel[]) => {
        const itemToUpdateIndex = items.findIndex((todoItem) => todoItem.selected);
        const itemToUpdate = items[itemToUpdateIndex];
        itemToUpdate.completed = true;

        this.todoService.updateTodo(itemToUpdate.id, itemToUpdate)
          .subscribe((data) => {
            this.store.dispatch(new TodoActions.UpdateTodo(itemToUpdate));
          });
      });

  }
}
