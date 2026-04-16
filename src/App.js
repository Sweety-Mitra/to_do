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
    setTasks([...tasks, newTask]);
  }

  //Delete Task Function
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  //toggle Task Completion Function
  const toggleTask=(id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Smart task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
}

export default App;
