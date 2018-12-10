import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo.component';

const todoRoutes: Routes = [
  {path: '', component: TodoComponent, children: [
      {path: '', redirectTo: 'list'},
      {path: 'list', component: TodoListComponent},
      {path: ':id', component: TodoDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes)
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
