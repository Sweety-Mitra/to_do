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

  return (
    <div>
      <h1>Smart task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
    </div>
  );
}

export default App;
