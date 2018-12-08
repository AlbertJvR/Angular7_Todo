import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoText') todoTextBox: ElementRef;

  public todoItems: any[] = [];
  public todoCount = 0;

  constructor() {
  }

  ngOnInit() {
  }

  public addTodoHandler(todoText: string): void {
    this.todoCount += 1;
    const newTodo = {
      id: this.todoCount,
      text: todoText,
      selected: false
    };

    this.todoItems.push(newTodo);

    this.todoTextBox.nativeElement.value = '';
  }
}
