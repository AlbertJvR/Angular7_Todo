import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from './todo-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TodoRoutingModule
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class TodoModule {
}
