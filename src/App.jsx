import { useState } from "react";
import List from "./components/list";

function App() {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );
  const addTodo = () => {
    setInput("");
    setShow(!show);
    let obj = {};
    obj.text = input;
    obj.completed = false;
    setList(list.push(obj));
    localStorage.setItem("list", JSON.stringify(list));
    setList(JSON.parse(localStorage.getItem("list")) ?? []);
  };

  const handleChange = () => {
    setList(JSON.parse(localStorage.getItem("list")) ?? []);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full md:p-28 py-20 bg-red-200">
        <p className="font-bold text-6xl">Todo List</p>
        <button
          className="bg-cyan-500 text-white text-2xl py-2 px-8 mt-5 rounded-xl font-bold"
          onClick={() => {
            setShow(!show);
          }}
        >
          Add Todo
        </button>
        {show && (
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              className="mt-5 p-2 rounded-xl text-4xl md:w-96 w-80"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="mt-2 bg-red-400 px-5 py-2 rounded-xl block font-bold text-white text-2xl"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        )}

        {list.length != 0 ? (
          list.map((item, index) => {
            return (
              <List
                key={index}
                index={index}
                item={item}
                list={list}
                handleChange={handleChange}
              />
            );
          })
        ) : (
          <p className="mt-5 text-3xl font-bold">No data in list</p>
        )}
      </div>
    </>
  );
}

export default App;
