export class TodoModel {
  constructor(public text: string = '',
              public completed: boolean = false,
              public completedAt: number = null) {}
}
