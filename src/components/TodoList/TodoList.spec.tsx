import { chance } from "../../../__tests__/utils/chance";
import { render, screen } from "../../../__tests__/utils/testRenderer";
import { Builder } from "builder-pattern";
import { ITodoItem, getTodos } from "../../redux/reducers/todosSlice";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector(getTodos);
  return (
    <div data-hook="todo-list">
      {todos.map((todo) => (
        <div key={todo.title} data-hook="todo-item">
          {todo.title}
        </div>
      ))}
    </div>
  );
};

const getTodoList = () => screen.getByTestId("todo-list");

const getTodoItems = () => screen.getAllByTestId("todo-item");

const getTodoItemTitle = (index: number) => getTodoItems()[index].textContent;

const aTodoItem = () => Builder<ITodoItem>({ title: chance.string() });

describe("TodoList", () => {
  it("should render an empty list", () => {
    render(<TodoList />);
    expect(getTodoList()).toBeDefined();
  });

  it("should render 1 todo item", () => {
    const todoItem = aTodoItem().build();
    render(<TodoList />, { preloadedState: { todos: [todoItem] } });
    expect(getTodoItems()).toHaveLength(1);
    expect(getTodoItemTitle(0)).toEqual(todoItem.title);
  });
});
