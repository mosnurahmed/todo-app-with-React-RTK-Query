import { useGetTodosQuery } from "../feature/api/apiSlice";
import Footer from "./Footer";
import Todo from "./Todo";
import tickImage from "../assets/images/double-tick.png";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const { color, status } = useSelector((state) => state.filter);

  let completedTodo = null;
  let content = null;
  let taskLeft;

  const colorHandler = (todo) => {
    if (!!color) {
      return todo.color === color;
    }
    return true;
  };
  const statusHandler = (todo) => {
    if (status === "completed") {
      return todo.completed === true;
    } else if (status === "incomplete") {
      return todo.completed === false;
    } else {
      return true;
    }
  };
  if (isLoading) {
    content = <p>Loading.......</p>;
  }
  if (!isLoading && isError) content = <p>There was an error</p>;

  if (!isLoading && !isError && todos.length > 0) {
    completedTodo = todos
      .filter(statusHandler)
      .filter(colorHandler)
      .filter((todo) => todo.completed === true)
      .map((todo) => <Todo todo={todo} key={todo.id} />);
    content = todos
      .filter(statusHandler)
      .filter(colorHandler)
      .filter((todo) => todo.completed === false)
      .map((todo) => <Todo todo={todo} key={todo.id} />);
    taskLeft = content.length;
  }
  if (!isLoading && !isError && todos.length === 0) {
    content = <p>No Todo Found</p>;
  }

  return (
    <div>
      {content}
      <hr className="mt-4" />
      <Footer taskLeft={taskLeft} />
      <hr className="mt-4" />
      <hr className="mt-4" />

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete Tasks</span>
        </li>
        <li className="cursor-pointer">Clear completed</li>
      </ul>
      {completedTodo}
    </div>
  );
}
