import { ChangeEvent, FormEvent, useState } from 'react';
import { TI_INPUT_TODO_ADD } from '../tests/utils/selectors';
import TodoItem, { TodoStatus } from '../utils/models/Todo';

type TodoAddFormProps = {
  add: (todo: TodoItem) => void;
};

const TodoAddForm = (props: TodoAddFormProps) => {
  const [todoValue, setTodoValue] = useState<string>('');
  const { add } = props;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoValue.length > 0) {
      add({ id: new Date().getTime(), status: TodoStatus.TODO, value: todoValue });
      setTodoValue('');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid={TI_INPUT_TODO_ADD}
        placeholder='Add task'
        value={todoValue}
        type='text'
        onChange={handleChange}
      />
    </form>
  );
};

export default TodoAddForm;
