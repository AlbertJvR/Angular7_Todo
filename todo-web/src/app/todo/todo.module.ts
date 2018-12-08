import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TodoRoutingModule
  ],
  exports: [],
  declarations: [
    TodoComponent,
    TodoItemComponent
  ],
  providers: []
})
export class TodoModule {
}
