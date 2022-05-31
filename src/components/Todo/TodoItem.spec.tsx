import userEvent from "@testing-library/user-event";
import { chance } from "../../../__tests__/utils/chance";
import { render, screen } from "../../../__tests__/utils/testRenderer";
import { Todo } from "../../redux/reducers/todoSlice";
import { todoBuilder } from "./todoBuilder";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  it("should render the right todo item", () => {
    const todo = todoBuilder().build();
    const todos: Todo[] = chance.n(
      () => todoBuilder().build(),
      chance.integer({ min: 1, max: 10 })
    );
    const allTodos = chance.shuffle([...todos, todo]);
    render(<TodoItem id={todo.id} />, { preloadedState: { todos: allTodos } });
    expect(screen.getByTestId("todo-title")).toHaveTextContent(todo.title);
  });

  it("should dispatch a delete for the todo", () => {
    const todo = todoBuilder().build();
    const allTodos = chance.shuffle([todo]);
    const { dispatchers } = render(<TodoItem id={todo.id} />, {
      preloadedState: { todos: allTodos },
    });
    userEvent.click(screen.getByTestId(`todo-delete-${todo.id}`));
    expect(dispatchers.deleteTodo).toBeCalled();
  });
});
