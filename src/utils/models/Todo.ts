export enum TodoStatus {
  TODO = 'todo',
  DONE = 'done',
}

type Todo = {
  value: string;
  id: number;
  status: TodoStatus;
};

export default Todo;
