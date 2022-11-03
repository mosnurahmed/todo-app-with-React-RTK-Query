import React from "react";

function EditForm({ text, setText, editHandler, cancelHandler }) {
  return (
    <>
      <div className="select-none flex-1  gap-4">
        <form className="flex gap-4	" onSubmit={editHandler}>
          <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)}></textarea>
          <button className="rounded-lg h-8 w-20 ... bg-violet-500 mt-3" type="submit">
            Edited
          </button>
        </form>
        <button className="rounded-lg h-8 w-20 ... bg-rose-600 " onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditForm;
