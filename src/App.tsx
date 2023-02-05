import { useState } from 'react';
import TodoAddForm from './common/TodoAddForm';
import TodoItemList from './common/TodoItemList';
import Todo, { TodoStatus } from './utils/models/Todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const removeTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const doneTodo = (todoId: number) => {
    const editTodos = (currentTodos: Todo[]) => {
      return currentTodos.map(todo => (todo.id !== todoId ? todo : { ...todo, status: TodoStatus.DONE }));
    };
    setTodos(editTodos);
  };

  return (
    <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', width: '50vw', justifyContent: 'space-around' }}>
        <TodoItemList
          actions={<TodoAddForm add={addTodo} />}
          todoStatus={TodoStatus.TODO}
          todos={todos}
          onDone={doneTodo}
          onRemove={removeTodo}
        />
        <TodoItemList todoStatus={TodoStatus.DONE} todos={todos} onDone={doneTodo} onRemove={removeTodo} />
      </div>
    </div>
  );
}

export default App;
