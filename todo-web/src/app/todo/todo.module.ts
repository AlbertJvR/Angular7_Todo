import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {SocketIoModule} from 'ngx-socket-io';
import {todoReducer} from './store/todo.reducer';

import {TodoComponent} from './todo.component';
import {TodoDetailComponent} from './todo-detail/todo-detail.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-list/todo-item/todo-item.component';
import {TodoRoutingModule} from './todo-routing.module';
import {TodoEffects} from './store/todo.effects';
import {EffectsModule} from '@ngrx/effects';

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
    MatSnackBarModule,
    SocketIoModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects])
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
