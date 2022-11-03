import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import { useColorChangeMutation, useDeleteTodoMutation, useGetTodosQuery } from "../feature/api/apiSlice";
import EditForm from "./EditForm";

export default function Todo({ todo }) {
  const { text: title, id, color, completed } = todo;

  const [deleteTodo, { isLoading, isError }] = useDeleteTodoMutation();
  const [colorChange] = useColorChangeMutation();
  const [text, setText] = useState(title);
  const [editMode, setEditMode] = useState(false);

  let content = null;
  if (isLoading) {
    content = <p>Loading.......</p>;
  }
  if (!isLoading && isError) content = <p>There was an error</p>;

  const deleteHandler = () => {
    // console.log(id);
    deleteTodo(id);
  };

  const colorHandler = (colors, id) => {
    let color = null;

    if (colors === "green") color = "green";
    if (colors === "yellow") color = "yellow";
    if (colors === "red") color = "red";

    colorChange({ color, id });
  };
  const statusHandler = (id, completed) => {
    console.log(completed);
    colorChange({ id, completed });
  };

  const editHandler = (e) => {
    e.preventDefault();
    colorChange({ id, text });
    setEditMode(false);
  };

  const cancelHandler = () => {
    setEditMode(false);
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        } `}
      >
        <input
          onChange={() => statusHandler(id, !completed)}
          type="checkbox"
          checked={completed}
          className="opacity-0 
        absolute rounded-full"
        />
        {completed && (
          <svg className="fill-current w-3 h-3 text-green-500 pointer-events-none" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {editMode ? (
        <EditForm text={text} setText={setText} cancelHandler={cancelHandler} editHandler={editHandler} />
      ) : (
        <div className="select-none flex-1" onClick={() => setEditMode(true)}>
          {title}
        </div>
      )}

      <div
        onClick={() => colorHandler("green", id)}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer 
          ${color === "green" ? "bg-green-500 border-green-500" : "border-green-500"}`}
      ></div>

      <div
        onClick={() => colorHandler("yellow", id)}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer 
          ${color === "yellow" ? "bg-yellow-500 border-yellow-500" : "border-yellow-500"}`}
      ></div>

      <div
        onClick={() => colorHandler("red", id)}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer 
        ${color === "red" ? "bg-red-500 border-red-500" : "border-red-500"}`}
      ></div>

      <img
        onClick={deleteHandler}
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />
      {content}
    </div>
  );
}
