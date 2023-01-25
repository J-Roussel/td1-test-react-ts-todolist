import { ReactNode } from 'react';
import Todo, { TodoStatus } from '../utils/models/Todo';
import TodoItem from './TodoItem';

type TodoItemListProps = {
  onDone?: (todoId: number) => void;
  onRemove?: (todoId: number) => void;
  todoStatus: TodoStatus;
  todos: Todo[];
  actions?: ReactNode;
};

const TodoItemList = (props: TodoItemListProps) => {
  const { todoStatus, todos, onDone, onRemove, actions } = props;
  const currentTodos = todos.filter(todo => todo.status === todoStatus);
  return (
    <div style={{ padding: '.5rem' }}>
      <h1>{todoStatus.toString().toUpperCase()}</h1>
      <div className='actions'>{todoStatus === TodoStatus.TODO && actions}</div>
      <div className='list-container'>
        {currentTodos.length > 0 ? (
          currentTodos.map((todo, index) => <TodoItem onRemove={onRemove} key={'input' + index + todo.id} todo={todo} onDone={onDone} />)
        ) : (
          <p className='message-muted'>No task</p>
        )}
      </div>
    </div>
  );
};

export default TodoItemList;
