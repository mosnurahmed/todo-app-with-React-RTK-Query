import { useDispatch, useSelector } from "react-redux";
import { addColor, addStatus } from "../feature/filter/filterSlice";

export default function Footer({ taskLeft }) {
  const dispatch = useDispatch();
  const { color, status } = useSelector((state) => state.filter);

  const colorAddHandler = (color) => {
    console.log(color);
    dispatch(addColor(color));
  };
  const statusHandler = (status) => {
    console.log(color);
    dispatch(addStatus(status));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{taskLeft > 0 ? taskLeft : "No"} tasks left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li onClick={() => statusHandler("All")} className={`cursor-pointer ${status === "All" && "font-bold"} `}>
          All
        </li>
        <li>|</li>
        <li
          onClick={() => statusHandler("incomplete")}
          className={`cursor-pointer ${status === "incomplete" && "font-bold"} `}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          onClick={() => statusHandler("complete")}
          className={`cursor-pointer ${status === "complete" && "font-bold"} `}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          onClick={() => colorAddHandler("green")}
          className={`h-3 w-3 border-2 
          ${color === "green" ? "bg-green-500 border-green-500 " : "border-green-500"} cursor-pointer rounded-full
          `}
        ></li>
        <li
          onClick={() => colorAddHandler("red")}
          className={`h-3 w-3 border-2 
          ${color === "red" ? "bg-red-500 border-red-500 " : "border-red-500"} cursor-pointer rounded-full
          `}
        ></li>
        <li
          onClick={() => colorAddHandler("yellow")}
          className={`h-3 w-3 border-2 
          ${color === "yellow" ? "bg-yellow-500 border-yellow-500 " : "border-yellow-500"} cursor-pointer rounded-full
          `}
        ></li>
      </ul>
    </div>
  );
}
