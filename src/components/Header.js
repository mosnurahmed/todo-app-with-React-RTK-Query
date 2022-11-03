import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation } from "../feature/api/apiSlice";

export default function Header() {
  const [text, setText] = useState(" ");
  const [addTodo, { isLoading, isError }] = useAddTodoMutation();

  const reset = () => {
    setText(" ");
  };

  const addHandler = (e) => {
    e.preventDefault();

    addTodo({
      text,
      completed: false,
    });
    reset();
  };

  return (
    <div>
      <form onSubmit={addHandler} className="flex items-center bg-gray-100 px-4 py-4 rounded-md">
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>All Tasks</span>
        </li>
      </ul>
    </div>
  );
}
