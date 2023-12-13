const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

const createTodo = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  todo.save();

  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(
    req.params.id,
    req.body.title
  );
  res.json(deletedTodo);
};

const editTodo = async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  res.json(updatedTodo);
};

const toggleTodoStatus = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();

  res.json(todo);
};

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.editTodo = editTodo;
exports.toggleTodoStatus = toggleTodoStatus;
