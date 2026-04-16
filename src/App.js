import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem'; 
import { useState } from 'react';

function App() {
  // const [tasks, setTasks] = useState([]);

  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: [],
  });

  const tasks = history.present;

  //Add Task Function
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    updateHistory(newTasks);
  }

  //Delete Task Function
  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    updateHistory(newTasks);
  }

  //toggle Task Completion Function
  const toggleTask=(id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    );
    updateHistory(newTasks);
  };

  //Edit Task Function
  const editTask = (id, newText) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? {...task, text: newText} : task
    );
    updateHistory(newTasks);
  };

  //Derived State total no.od tasks

  const totalTasks = tasks.length;

  //no.of completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;

  //no.of pending tasks
  const pendingTasks = tasks.filter(task => !task.completed).length;

  //update history

  const updateHistory = (newPresent) => {
    setHistory((prev)=>({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: [],
    }));
  };

  //Undo Function
  const undo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0,- 1);
      return {
        past: newPast,
        present: previous,
        future: [...prev.future, prev.present],
      };
    });
  };


  //Redo Function
  const redo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  };


  return (
    <div>
      <h1>Smart task Manager</h1>
      <div>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
      </div>
      <div>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
    </div>
  );
}

export default App;
