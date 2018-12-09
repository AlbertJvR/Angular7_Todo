import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoText') todoTextBox: ElementRef;

  public todoItems: any[] = [];
  public todoCount = 0;

  constructor(private router: Router) {
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

  public itemSelectedHandler(item: any): void {
    this.todoItems.map((todoItem) => {
      todoItem.selected = item.id === todoItem.id;
      return todoItem;
    });
  }

  public viewTodoHandler(): void {
    const selectedTodoIndex = this.todoItems.findIndex((todoItem) => todoItem.selected);

    console.log(this.todoItems[selectedTodoIndex].id);

    this.router.navigate(['/todos/' + this.todoItems[selectedTodoIndex].id]);
  }

  public completeTodoHandler(): void {
    this.todoItems = this.todoItems.filter((todoItem) => !todoItem.selected);
  }
}
