import { useEffect, useRef, useState } from "react";

export default function List(props) {
  const [input, setInput] = useState(props.item.text);
  useEffect(() => {
    setInput(props.item.text);
    setCompleted(props.item.completed);
  }, [props.item.text, props.item.completed]);
  const inputRef = useRef(null);
  const [state, setState] = useState(true);
  const [edit, setEdit] = useState(false);
  const [completed, setCompleted] = useState(props.item.completed);

  const handleEdit = () => {
    inputRef.current.focus();
    setState(!state);
    setEdit(!edit);
  };

  const handleUpdate = () => {
    props.list[props.index].text = input;
    localStorage.setItem("list", JSON.stringify(props.list));
    props.handleChange();
    setState(!state);
    setEdit(!edit);
  };

  const handleTick = () => {
    setCompleted(!completed);
    props.list[props.index].completed = !completed;
    localStorage.setItem("list", JSON.stringify(props.list));
    props.handleChange();
  };

  const handleDelete = () => {
    props.list.splice(props.index, 1);
    localStorage.setItem("list", JSON.stringify(props.list));
    props.handleChange();
  };

  return (
    <div className="mt-2 border-2 border-black bg-white md:w-96 w-80  p-1 flex gap-2">
      <input
        className={`text-2xl p-2 rounded w-2/3 ${
          completed && "line-through"
        }  decoration-red-700 decoration-4`}
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        disabled={state}
      />
      {!edit && !completed && (
        <img
          src="/Todo/images/edit.png"
          className="w-10 h-10 cursor-pointer"
          alt="edit"
          onClick={handleEdit}
        />
      )}
      {!edit && !completed && (
        <img
          src="/Todo/images/done.png"
          className="w-10 h-10 cursor-pointer"
          alt="done"
          onClick={handleTick}
        />
      )}
      {!edit && completed && (
        <img
          src="/Todo/images/revert.png"
          className="w-10 h-10 cursor-pointer"
          alt="revert"
          onClick={handleTick}
        />
      )}
      {edit && (
        <img
          src="/Todo/images/update.png"
          className="w-10 h-10 cursor-pointer"
          alt="update"
          onClick={handleUpdate}
        />
      )}
      {edit && (
        <img
          src="/Todo/images/cancel.png"
          className="w-10 h-10 cursor-pointer"
          alt="cancel"
          onClick={() => {
            setState(!state);
            setEdit(!edit);
          }}
        />
      )}
      <img
        src="/Todo/images/delete.png"
        className="w-12 h-12 cursor-pointer"
        alt="delete"
        onClick={handleDelete}
      />
    </div>
  );
}
