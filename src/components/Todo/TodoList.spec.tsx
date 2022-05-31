import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";
import { chance } from "../../../__tests__/utils/chance";
import { render, screen, waitFor } from "../../../__tests__/utils/testRenderer";
import { Todo } from "../../redux/reducers/todoSlice";
import { todoBuilder } from "./todoBuilder";
import { TodoList } from "./TodoList";

const mockAxios = new MockAdapter(axios);

describe("TodoList", () => {
  it("should show an empty list", () => {
    render(<TodoList />);
    expect(screen.getByTestId("empty-list")).toBeInTheDocument();
    expect(screen.getByTestId("add-todo")).toBeInTheDocument();
  });

  it("should render a single item", () => {
    const todo = todoBuilder().build();
    render(<TodoList />, { preloadedState: { todos: [todo] } });
    expect(screen.getByTestId("todo-title")).toHaveTextContent(todo.title);
    expect(screen.getByTestId("add-todo")).toBeInTheDocument();
  });

  it("should render a list of items", async () => {
    const todos: Todo[] = chance.n(
      () => todoBuilder().build(),
      chance.integer({ min: 1, max: 10 })
    );
    render(<TodoList />, { preloadedState: { todos } });
    expect(await screen.findAllByTestId("todo-title")).toHaveLength(
      todos.length
    );
    expect((await screen.findAllByTestId("todo-title"))[0]).toHaveTextContent(
      todos[0].title
    );
  });

  describe("AddTodo", () => {
    beforeEach(() => {
      mockAxios.reset();
      mockAxios.onPost("http://localhost:3001/todos").reply(200);
    });

    it("should call add todo", async () => {
      render(<TodoList />, { realReducers: true });
      const title = chance.string();
      mockAxios
        .onGet("http://localhost:3001/todos")
        .reply(200, { todos: [{ id: 1, title, isActive: true }] });
      userEvent.type(screen.getByTestId("add-todo-input"), title);
      userEvent.click(screen.getByTestId("add-todo-button"));
      await waitFor(() =>
        expect(screen.getByTestId("todo-title")).toHaveTextContent(title)
      );
      expect(mockAxios.history.post).toHaveLength(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
        title,
        isActive: true,
      });
    });
  });

  describe("DeleteTodo", () => {
    beforeEach(() => {
      mockAxios.reset();
    });

    it("should call add todo", async () => {
      const todos: Todo[] = chance.n(
        () => todoBuilder().build(),
        chance.integer({ min: 1, max: 10 })
      );
      const todo = chance.pickone(todos);
      mockAxios.onDelete(`http://localhost:3001/todos/${todo.id}`).reply(200);
      render(<TodoList />, { preloadedState: { todos }, realReducers: true });
      const elementToDelete = screen.getByTestId(`todo-title-${todo.id}`);

      userEvent.click(screen.getByTestId(`todo-delete-${todo.id}`));
      await waitFor(() => expect(elementToDelete).not.toBeInTheDocument());
    });
  });
});
