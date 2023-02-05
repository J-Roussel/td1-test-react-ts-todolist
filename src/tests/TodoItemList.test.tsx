import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create, ReactTestRendererJSON } from 'react-test-renderer';
import TodoAddForm from '../common/TodoAddForm';
import TodoItemList from '../common/TodoItemList';
import Todo, { TodoStatus } from '../utils/models/Todo';
import { TODO_LIST_MOCK } from './utils/mocks/todo-mock';
import {
  TI_INPUT_TODO_ADD,
  TI_INPUT_TODO_DELETE,
  TI_INPUT_TODO_DONE,
  TR_INPUT_TODO_DELETE,
  TR_INPUT_TODO_DONE,
} from './utils/selectors';

describe('Test TodoItemList', () => {
  test('Architecture', () => {
    const tree = create(
      <TodoItemList
        key='todo_item_list_1'
        todoStatus={TodoStatus.TODO}
        todos={TODO_LIST_MOCK}
        actions={<TodoAddForm add={todo => console.log(todo)} />}
        onDone={id => console.log(id)}
        onRemove={id => console.log(id)}
      />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree).toMatchSnapshot();
  });

  test('When todo status === TODO', () => {
    const handleDone: jest.Mock<number> = jest.fn(id => id);
    const TODO_TODO_MOCK: Todo[] = TODO_LIST_MOCK.filter(todo => todo.status === TodoStatus.TODO);
    const todoToDone = TODO_TODO_MOCK[0];
    const toDoneSelector = `${TI_INPUT_TODO_DONE}-${todoToDone.id}`;
    render(
      <TodoItemList
        key='todo_item_list_1'
        todoStatus={TodoStatus.TODO}
        todos={TODO_LIST_MOCK}
        actions={<TodoAddForm add={todo => console.log(todo)} />}
        onDone={handleDone}
        onRemove={id => console.log(id)}
      />
    );

    screen.getByText(TodoStatus.TODO.toString().toLocaleUpperCase());

    expect(screen.queryByText('No task')).toBeNull();
    expect(screen.getByTestId(TI_INPUT_TODO_ADD)).toBeTruthy();
    expect(screen.queryByRole(TR_INPUT_TODO_DELETE)).toBeNull();
    expect(screen.queryAllByRole(TR_INPUT_TODO_DONE).length).toBe(TODO_TODO_MOCK.length);

    userEvent.click(screen.getByTestId(toDoneSelector));
    expect(handleDone.mock.results[0].value).toEqual(todoToDone.id);
  });

  test('When todo status === DONE', () => {
    const handleRemove: jest.Mock<number> = jest.fn(id => id);
    const TODO_DONE_MOCK: Todo[] = TODO_LIST_MOCK.filter(todo => todo.status === TodoStatus.DONE);
    const todoToRemove = TODO_DONE_MOCK[0];
    const toRemoveSelector = `${TI_INPUT_TODO_DELETE}-${todoToRemove.id}`;
    render(
      <TodoItemList
        key='todo_item_list_1'
        todoStatus={TodoStatus.DONE}
        todos={TODO_LIST_MOCK}
        actions={<TodoAddForm add={todo => console.log(todo)} />}
        onDone={id => console.log(id)}
        onRemove={handleRemove}
      />
    );

    screen.getByText(TodoStatus.DONE.toString().toLocaleUpperCase());

    expect(screen.queryByText('No task')).toBeNull();
    expect(screen.queryByRole(TR_INPUT_TODO_DONE)).toBeNull();
    expect(screen.queryByTestId(TI_INPUT_TODO_ADD)).toBeNull();
    expect(screen.queryAllByRole(TR_INPUT_TODO_DELETE).length).toBe(TODO_DONE_MOCK.length);

    userEvent.click(screen.getByTestId(toRemoveSelector));
    expect(handleRemove.mock.results[0].value).toEqual(todoToRemove.id);
  });

  test('When there is no todo', () => {
    render(
      <TodoItemList
        key='todo_item_list_1'
        todoStatus={TodoStatus.DONE}
        todos={[]}
        actions={<TodoAddForm add={todo => console.log(todo)} />}
        onDone={id => console.log(id)}
        onRemove={id => console.log(id)}
      />
    );

    screen.getByText(TodoStatus.DONE.toString().toLocaleUpperCase());

    expect(screen.queryByText('No task')).toBeTruthy();
    expect(screen.queryByRole(TR_INPUT_TODO_DONE)).toBeNull();
    expect(screen.queryByRole(TR_INPUT_TODO_DELETE)).toBeNull();
    expect(screen.queryByTestId(TI_INPUT_TODO_ADD)).toBeNull();
  });
});
