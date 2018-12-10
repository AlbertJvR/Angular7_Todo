export class TodoModel {
  constructor(
    public id: string = '',
    public text: string = '',
    public selected: boolean = false,
    public completed: boolean = false,
    public completedAt: number = null) {}
}
