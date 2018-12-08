import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';

const todoRoutes: Routes = [
  {path: '', component: TodoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes)
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
