import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import TodoAddForm from '../common/TodoAddForm';
import Todo, { TodoStatus } from '../utils/models/Todo';

describe('Test TodoAddForm', () => {
  test('Architecture', () => {
    const tree = create(
      <TodoAddForm
        add={todo => {
          console.log(todo);
        }}
        key='todoAddForm-1'
      />
    );

    expect(tree).toMatchSnapshot();
  });

  test('Add new todo', () => {
    const addTodo: jest.Mock<Todo> = jest.fn(todo => todo);
    const valueOfNewTodo: string = 'This is a new todo for test';
    const idBeforeNewTodo: number = new Date().getTime();

    render(<TodoAddForm add={addTodo} key='todoAddForm-1' />);

    const addTodoInput = screen.getByPlaceholderText('Add task');

    expect(addTodoInput).toBeTruthy();
    userEvent.type(addTodoInput, `${valueOfNewTodo}{Enter}`);
    expect(addTodo.mock.results).not.toBeNull();
    const { id, status, value }: Todo = addTodo.mock.results[0].value;

    expect(status).toEqual(TodoStatus.TODO);
    expect(value).toEqual(valueOfNewTodo);
    expect(idBeforeNewTodo).toBeLessThanOrEqual(id);
    expect(id).toBeLessThanOrEqual(new Date().getTime());
  });
});
