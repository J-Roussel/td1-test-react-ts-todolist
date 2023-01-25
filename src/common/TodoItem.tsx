import {
  TI_INPUT_TODO_DELETE,
  TI_INPUT_TODO_DONE,
  TR_INPUT_TODO_DELETE,
  TR_INPUT_TODO_DONE,
} from '../tests/utils/selectors';
import Todo, { TodoStatus } from '../utils/models/Todo';

type TodoItemProps = {
  todo: Todo;
  onDone?: (todoId: number) => void;
  onRemove?: (todoId: number) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { onDone, todo, onRemove } = props;

  const toDone = () => {
    onDone && onDone(todo.id);
  };

  const remove = () => {
    onRemove && onRemove(todo.id);
  };

  return (
    <div className='flex todo-item'>
      {todo.status === TodoStatus.TODO && (
        <input
          type='checkbox'
          className='pointer'
          onChange={toDone}
          id={todo.id.toString()}
          // tests props
          data-testid={`${TI_INPUT_TODO_DONE}-${todo.id}`}
          role={TR_INPUT_TODO_DONE}
        />
      )}
      <label className='ml-2'>{todo.value}</label>
      {todo.status === TodoStatus.DONE && (
        <p
          className='ml-2 pointer'
          onClick={remove}
          // tests props
          data-testid={`${TI_INPUT_TODO_DELETE}-${todo.id}`}
          role={TR_INPUT_TODO_DELETE}
        >
          x
        </p>
      )}
    </div>
  );
};

export default TodoItem;
