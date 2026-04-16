import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem'; 
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }
  return (
    <div>
      <h1>Smart task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
