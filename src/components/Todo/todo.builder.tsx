import { chance } from "../../../__tests__/utils/chance";
import { Todo } from "../../redux/reducers/todoSlice";

export const todoBuilder = (defaultProps?: Partial<Todo>) => {
  const todo: Todo = {
    id: chance.integer(),
    title: chance.word(),
    isActive: true,
    ...defaultProps,
  };
  const api = {
    given: {
      title: (title: string) => {
        todo.title = title;
        return api;
      },
    },
    build: () => todo,
  };
  return api;
};

export const aTodo = (todo?: Partial<Todo>) => todoBuilder(todo).build();
export const someTodos = (count = chance.integer({ min: 1, max: 10 })) =>
  chance.n(aTodo, count);
