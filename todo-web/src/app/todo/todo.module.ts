import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from './todo-routing.module';

import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';


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
    MatButtonModule
  ],
  exports: [],
  declarations: [
    TodoComponent,
    TodoItemComponent,
    TodoDetailComponent
  ],
  providers: []
})
export class TodoModule {
}
