import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todos`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddTodo = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/todo/new`, {
        title: todo,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTodo("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/todo/delete/${id}`)
      .then((res) =>
        setTodos(todos.filter((todo) => todo._id !== res.data._id))
      )
      .catch((err) => console.error(err));
  };

  const handleTodoClick = (id) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todo/toggleStatus/${id}`)
      .then(() => getTodos())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <p className="pt-10 text-5xl text-center">MERN TODO!</p>
      </div>
      <div className="p-8 bg-white rounded overflow-auto lg:w-[550px] md:w-[450px] w-[350px]  mx-auto m-10 border border-gray-700 min-h-[600px]">
        <div className="flex mt-10">
          <input
            className="text-lg border border-gray-400 outline-none lg:w-[550px] md:w-[550px] w-96 rounded h-9 "
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button
            className="cursor-pointer lg:w-9 h-9"
            type="button"
            onClick={handleAddTodo}
          >
            <AiFillPlusSquare size={38} />
          </button>
        </div>

        <div className="mt-8 text-xl">
          {!todos || !todos.length ? (
            <h3 className="text-center">No Todo Data!</h3>
          ) : (
            todos.map((todo) => (
              <div
                className="relative lg:w-[448px] bg-white text-gray-500 p-3 mb-3 rounded border-gray-400 "
                key={todo._id}
              >
                  <span
                    onClick={() => handleTodoClick(todo._id)}
                    className={
                      "cursor-pointer " + (todo.complete ? "complete" : "")
                    }
                    id="todo-title"
                  >
                    {todo.title}
                  </span>
                <span
                  className="absolute text-xl cursor-pointer text-custom-hsla right-3 top-3"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <AiFillDelete size={25} />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
