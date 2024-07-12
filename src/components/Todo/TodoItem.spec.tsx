import { chance } from "../../../__tests__/utils/chance";
import { Todo } from "../../redux/reducers/todoSlice";
import { aTodo, someTodos } from "./todo.builder";
import { TodoDriver } from "./TodoItem.driver";

describe("TodoItem", () => {
  let driver: TodoDriver;

  beforeEach(() => {
    driver = new TodoDriver();
  });

  it("should render the right todo item", () => {
    const todo = aTodo();
    const todos: Todo[] = someTodos();
    driver.given
      .todos(chance.shuffle([...todos, todo]))
      .given.todoIdToRender(todo.id)
      .when.render();

    expect(driver.get.title()).toHaveTextContent(todo.title);
  });

  it("should dispatch a delete for the todo", () => {
    const todo = aTodo();
    driver.given.todos([todo]).given.todoIdToRender(todo.id).when.render();

    driver.when.clickOnDelete();
    expect(driver.get.deleteSpy()).toBeCalled();
  });
});
