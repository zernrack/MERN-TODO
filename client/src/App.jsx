import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusSquare, AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

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

  const handleToggleTodoStatus = (id) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/todo/toggleStatus/${id}`)
      .then(() => getTodos())
      .catch((err) => console.error(err));
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    const editedTodoObj = todos.find((t) => t._id === id);
    setEditedTodo(editedTodoObj.title);
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/todo/edit/${id}`, {
        title: editedTodo,
      })
      .then(() => {
        setEditingTodoId(null);
        getTodos();
      })
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
          todos.map((todoItem) => (
            <div
              className="relative lg:w-[448px] bg-white text-gray-500 p-3 mb-3 rounded border-gray-400 "
              key={todoItem._id}
            >
              {editingTodoId === todoItem._id ? (
                <>
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    className="w-full text-lg border border-gray-400 rounded outline-none h-9"
                  />
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => handleSaveEdit(todoItem._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => handleToggleTodoStatus(todoItem._id)}
                    className={
                      "cursor-pointer " + (todoItem.complete ? "complete" : "")
                    }
                    id="todo-title"
                  >
                    {todoItem.title}
                  </span>
                  <span
                    className="absolute text-xl cursor-pointer text-custom-hsla right-3 top-3"
                    onClick={() => handleDeleteTodo(todoItem._id)}
                  >
                    <AiFillDelete size={25} />
                  </span>
                  <span
                    className="absolute text-xl cursor-pointer text-custom-hsla right-10 top-3"
                    onClick={() => handleEditTodo(todoItem._id)}
                  >
                    <AiFillEdit size={25} />
                  </span>
                </>
              )}
            </div>
          ))
        )}
      </div>
      </div>
    </>
  );
}

export default App;
