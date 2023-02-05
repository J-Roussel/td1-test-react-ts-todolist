import { fireEvent, render, screen } from '@testing-library/react';
import { create, ReactTestRendererJSON } from 'react-test-renderer';
import TodoItem from '../common/TodoItem';
import { TODO_1_MOCK, TODO_DONE_1_MOCK } from './utils/mocks/todo-mock';
import { TI_INPUT_TODO_DELETE, TI_INPUT_TODO_DONE, TR_INPUT_TODO_DELETE, TR_INPUT_TODO_DONE } from './utils/selectors';

describe('Test TodoItem', () => {
  test('Architecture', () => {
    const tree = create(
      <TodoItem
        key='todo_1'
        onDone={todoId => {
          console.log(todoId);
        }}
        onRemove={todoId => {
          console.log(todoId);
        }}
        todo={TODO_1_MOCK}
      />
    ).toJSON() as ReactTestRendererJSON;

    expect(tree).toMatchSnapshot();
  });

  test('When todo status === TODO', () => {
    const toDoneSelector = `${TI_INPUT_TODO_DONE}-${TODO_1_MOCK.id}`;
    const handleDone: jest.Mock<number> = jest.fn(id => id);
    render(<TodoItem key='todo_1' onDone={handleDone} todo={TODO_1_MOCK} />);

    screen.getByText(TODO_1_MOCK.value);
    expect(screen.getByTestId(toDoneSelector)).not.toBeChecked();
    expect(screen.queryByRole(TR_INPUT_TODO_DELETE)).toBeNull();
    fireEvent.click(screen.getByTestId(toDoneSelector));
    expect(handleDone.mock.results[0].value).toEqual(TODO_1_MOCK.id);
  });

  test('When todo status === DONE', () => {
    const deleteTodoSelector = `${TI_INPUT_TODO_DELETE}-${TODO_DONE_1_MOCK.id}`;
    const handleRemove: jest.Mock<number> = jest.fn(id => id);
    render(<TodoItem key='todo_1' onRemove={handleRemove} todo={TODO_DONE_1_MOCK} />);

    screen.getByText(TODO_DONE_1_MOCK.value);
    screen.getByText('x');

    fireEvent.click(screen.getByTestId(deleteTodoSelector));

    expect(handleRemove.mock.results[0].value).toEqual(TODO_DONE_1_MOCK.id);
    expect(screen.queryByRole(TR_INPUT_TODO_DONE)).toBeNull();
    expect(screen.queryByTestId(deleteTodoSelector)).toBeTruthy();
  });
});
