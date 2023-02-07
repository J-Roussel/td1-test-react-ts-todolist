import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create, ReactTestRendererJSON } from 'react-test-renderer';
import TodoAddForm from '../components/TodoAddForm';
import TodoItemList from '../components/TodoItemList';
import Todo, { TodoStatus } from '../utils/models/Todo';
import { TODO_LIST_MOCK } from './utils/mocks/todo-mock';
import { ID_TODO_ADD, ID_TODO_DELETE, ID_TODO_DONE, ROLE_TODO_DELETE } from './utils/selectors';

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
    const toDoneSelector = `${ID_TODO_DONE}-${todoToDone.id}`;
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
    expect(screen.getByTestId(ID_TODO_ADD)).toBeTruthy();
    expect(screen.queryByRole(ROLE_TODO_DELETE)).toBeNull();
    expect(screen.queryAllByRole('checkbox').length).toBe(TODO_TODO_MOCK.length);

    userEvent.click(screen.getByTestId(toDoneSelector));
    expect(handleDone.mock.results[0].value).toEqual(todoToDone.id);
  });

  test('When todo status === DONE', () => {
    const handleRemove: jest.Mock<number> = jest.fn(id => id);
    const TODO_DONE_MOCK: Todo[] = TODO_LIST_MOCK.filter(todo => todo.status === TodoStatus.DONE);
    const todoToRemove = TODO_DONE_MOCK[0];
    const toRemoveSelector = `${ID_TODO_DELETE}-${todoToRemove.id}`;
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
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.queryByTestId(ID_TODO_ADD)).toBeNull();
    expect(screen.queryAllByRole(ROLE_TODO_DELETE).length).toBe(TODO_DONE_MOCK.length);

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
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.queryByRole(ROLE_TODO_DELETE)).toBeNull();
    expect(screen.queryByTestId(ID_TODO_ADD)).toBeNull();
  });
});
