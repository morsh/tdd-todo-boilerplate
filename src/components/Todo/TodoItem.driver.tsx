import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../__tests__/utils/testRenderer";
import { Todo } from "../../redux/reducers/todoSlice";
import { TodoItem } from "./TodoItem";
import { RootState } from "../../redux/store/configureStore";
import { Dispatchers } from "../../redux/dispatchers/dispatchers";

export class TodoDriver {
  private state: Partial<RootState> = {};
  private todoId!: number;

  constructor(private dispatchers?: Dispatchers) {}

  given = {
    todos: (todos: Todo[]) => {
      this.state.todos = todos;
      return this;
    },
    todoIdToRender: (id: number) => {
      this.todoId = id;
      return this;
    },
  };

  when = {
    render: () => {
      const result = render(<TodoItem id={this.todoId} />, {
        preloadedState: this.state,
      });
      this.dispatchers = result.dispatchers;
    },
    clickOnDelete: () => {
      userEvent.click(screen.getByTestId(`todo-delete-${this.todoId}`));
      return this;
    },
  };

  get = {
    title: () => screen.getByTestId("todo-title"),
    deleteSpy: () => this.dispatchers!.deleteTodo,
    findAllTodoItems: () => screen.findAllByTestId("todo-title"),
  };
}
