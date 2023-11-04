import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusSquare, AiFillDelete } from "react-icons/ai";
import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  // console.log("results:", import.meta.env.VITE_API_URL);

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
      <div className="flex flex-col gap-10">
        <div className="inline-flex items-center justify-center gap-3">
          <div className="todo-input-wrapper">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a new todo..."
            />
          </div>
          <button type="button" onClick={handleAddTodo}>
            <AiFillPlusSquare size={30} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center todo-list">
          {!todos || !todos.length ? (
            <h3 className="text-center">No Todo Data!</h3>
          ) : (
            todos.map((todo) => (
              <div className="inline-flex todo" key={todo._id}>
                <span
                  onClick={() => handleTodoClick(todo._id)}
                  className={todo.complete ? "complete" : ""}
                  id="todo-title"
                >
                  {todo.title}
                </span>
                <span
                  className="delete"
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
