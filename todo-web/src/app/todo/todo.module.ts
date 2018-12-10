import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/todo.reducer';

import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoRoutingModule } from './todo-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TodoRoutingModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    StoreModule.forFeature('todo', todoReducer)
  ],
  exports: [],
  declarations: [
    TodoComponent,
    TodoItemComponent,
    TodoDetailComponent,
    TodoListComponent
  ],
  providers: []
})
export class TodoModule {
}
