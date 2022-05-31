import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, waitFor } from "../../../__tests__/utils/testRenderer";
import { TodoRoot } from "./TodoRoot";

const mockAxios = new MockAdapter(axios);

describe("TodoRoot", () => {
  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onGet(`http://localhost:3001/todos`).reply(200, { todos: [] });
  });

  it("should call load todos", async () => {
    render(<TodoRoot />);
    await waitFor(() => expect(mockAxios.history.get).toHaveLength(1));
  });
});
