import Todo, { TodoStatus } from "../../../utils/models/Todo";

const createTodo = (todoId: number, isDone: boolean): Todo => {
    const mock: Todo = {
        id: todoId,
        status: isDone ? TodoStatus.DONE : TodoStatus.TODO,
        value: "Todo number " + todoId
    };

    return mock;
}

export const TODO_LIST_MOCK: Todo[] = (() => {
    const mocks: Todo[] = [];
    for (let a = 1; a < 11; a++) {
        mocks.push(createTodo(a, a % 2 === 0));
    }
    return mocks;
})()

export const TODO_1_MOCK: Todo = createTodo(1, false);
export const TODO_DONE_1_MOCK: Todo = createTodo(1, true);