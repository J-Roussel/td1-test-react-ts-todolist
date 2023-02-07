import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create, ReactTestRendererJSON } from 'react-test-renderer';
import App from '../App';
import { ID_TODO_ADD, ROLE_TODO_DELETE } from './utils/selectors';

describe('Test App', () => {
  test('Architecture', () => {
    const tree = create(<App />).toJSON() as ReactTestRendererJSON;

    expect(tree).toMatchSnapshot();
  });

  test('Application functionality', () => {
    render(<App />);

    screen.getAllByText('No task');
    screen.getByPlaceholderText('Add task');
    const inputAddSelector = screen.getByTestId(ID_TODO_ADD);

    userEvent.type(inputAddSelector, 'New todo 1{Enter}');

    screen.getByText('New todo 1');

    const toDoneSelector = screen.getByRole('checkbox');
    userEvent.click(toDoneSelector);

    userEvent.type(inputAddSelector, 'New todo 2{Enter}');
    userEvent.type(inputAddSelector, 'New todo 3{Enter}');

    screen.getByText('New todo 2');

    expect(screen.queryAllByRole('checkbox').length).toBe(2);
    expect(screen.queryAllByRole(ROLE_TODO_DELETE).length).toBe(1);

    const toRemoveSelector = screen.getByRole(ROLE_TODO_DELETE);
    userEvent.click(toRemoveSelector);

    expect(screen.queryByRole(ROLE_TODO_DELETE)).not.toBeTruthy();
  });
});
