import { render, screen } from "../../../__tests__/utils/testRenderer";
import { Todo } from "../../redux/reducers/todoSlice";
import { TodoList } from "./TodoList";
import { TodoDriver } from "./TodoItem.driver";
import { RootState } from "../../redux/store/configureStore";

export class TodoListDriver {
  private state: Partial<RootState> = {};

  private itemDriver = new TodoDriver();

  given = {
    todos: (todos: Todo[]) => {
      this.state.todos = todos;
      return this;
    },
  };

  when = {
    render: () => {
      render(<TodoList />, { preloadedState: this.state });
    },
  };
  get = {
    emptyList: () => screen.getByTestId("empty-list"),
    addTodo: () => screen.getByTestId("add-todo"),
    todo: (todo: Todo) => new TodoDriver().given.todoIdToRender(todo.id),
    findAllTodoItems: this.itemDriver.get.findAllTodoItems,
  };
}
