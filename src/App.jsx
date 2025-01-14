import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage
  const savetoLS = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Add a new todo
  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false, isPriority: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTodo('');
    savetoLS(updatedTodos);
  };

  // Edit a todo
  const handleEdit = (e, id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    savetoLS(updatedTodos);
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Delete a todo
  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    savetoLS(updatedTodos);
  };

  // Handle checkbox change to mark task as completed
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    savetoLS(updatedTodos);
  };

  // Toggle priority of a todo
  const handlePriority = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isPriority: !item.isPriority } : item
    );
    // Sort priority tasks to the top
    updatedTodos.sort((a, b) => b.isPriority - a.isPriority);
    setTodos(updatedTodos);
    savetoLS(updatedTodos);
  };

  // Handle dialog open/close
  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <Navbar />
      <div className="container flex justify-center my-4 font-open">
        <div className="todobox bg-violet-100 rounded-xl p-4 w-full max-w-[90vw] md:max-w-[60vw] lg:max-w-[45vw] h-auto md:h-[75vh]">
          <div className="heading h-auto md:h-20 flex items-center justify-center font-bold text-[20px] md:text-[30px] text-center">
            iTask - Manage all Your todos at one place
          </div>
          <div className="todobody">
            <h1 className="font-bold text-[18px] md:text-[25px]">Add a Todo</h1>
            <div className="addbar">
              <input
                onChange={handleChange}
                type="search"
                value={todo}
                className="w-full md:w-[36vw] h-[40px] rounded-3xl px-4"
              />
              <button
                onClick={handleAdd}
                className="border text-white bg-purple-500 text-[16px] md:text-[18px] px-4 py-1 mx-3 my-3 rounded-3xl"
                disabled={todo.length < 3}
              >
                Save
              </button>
            </div>
            <div className="flex justify-center">
              <div className="hr w-full md:w-[40vw] bg-gray-400 h-0.5"></div>
            </div>
            <div className="displaytodos my-8">
              <h1 className="text-[18px] md:text-[25px] font-bold">Your Todos</h1>
            </div>
            <div className="todos flex flex-col gap-3">
              {todos.length === 0 && <div className="m-5">No todos to be displayed</div>}
              {todos.map((item) => (
                <div
                  key={item.id}
                  className="todo-item flex items-center justify-between p-2 bg-white rounded-lg shadow-md"
                >
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={`${item.isCompleted ? 'line-through' : ''} flex-grow px-2`}>
                    {item.todo}
                  </div>
                  <div className="buttons flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="edit text-white bg-purple-500 text-[16px] px-2 py-1 rounded-3xl"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleClickOpen(item.id)}
                      className="text-white bg-purple-500 text-[16px] px-2 py-1 rounded-3xl"
                    >
                      <MdDeleteOutline />
                    </button>
                    <button
                      onClick={() => handlePriority(item.id)}
                      className={`text-white ${
                        item.isPriority ? 'bg-red-500' : 'bg-purple-500'
                      } text-[16px] px-2 py-1 rounded-3xl`}
                    >
                      {item.isPriority ? 'Unprioritize' : 'Prioritize'}
                    </button>
                  </div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Do you really wish to delete this?</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(null, deleteId);
                          handleClose();
                        }}
                        color="primary"
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
