import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem'; 
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  //Add Task Function
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  //Delete Task Function
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(task => task.id !== id));
  }

  //toggle Task Completion Function
  const toggleTask=(id) => {
    setTasks((prev) => prev.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  //Edit Task Function
  const editTask = (id, newText) => {
    setTasks((prevTasks)=>
      prevTasks.map((task)=>
        task.id === id ? {...task, text: newText} : task
      )
    );
  };

  //Derived State total no.od tasks

  const totalTasks = tasks.length;

  //no.of completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;

  //no.of pending tasks
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div>
      <h1>Smart task Manager</h1>
      <div>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
      </div>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
    </div>
  );
}

export default App;
