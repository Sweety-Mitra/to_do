import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useState } from 'react';
import { fakeApiCall } from './utils/fakeApi';
import { useMemo } from 'react';

function App() {
  // const [tasks, setTasks] = useState([]);

  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: [],
  });

  const tasks = history.present;

  //Derived State total no.of tasks

  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);  

  //Add Task Function
  const addTask = async (task) => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    const prevState= history.present;
    const newTasks = [...tasks, newTask];
    updateHistory(newTasks);
    try{
      await fakeApiCall(newTasks);
    } catch (error) {
      console.error('Error adding task:', error);
      setHistory((prev) => ({
        ...prev,
        present: prevState,
      }));
    }
  }

  //Delete Task Function
  const deleteTask = async (id) => {
    const prevState= history.present;
    const newTasks = tasks.filter(task => task.id !== id);
    updateHistory(newTasks);
    try{
      await fakeApiCall(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      setHistory((prev) => ({
        ...prev,
        present: prevState,
      }));
    }
  }

  //toggle Task Completion Function
  const toggleTask=async (id) => {
    const prevState= history.present;
    const newTasks = tasks.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    );
    updateHistory(newTasks);
    try{
      await fakeApiCall(newTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
      setHistory((prev) => ({
        ...prev,
        present: prevState,
      }));
    }
  };

  //Edit Task Function
  const editTask = async (id, newText) => {
    const prevState= history.present;
    const newTasks = tasks.map((task) =>
      task.id === id ? {...task, text: newText} : task
    );
    updateHistory(newTasks);
    try{
      await fakeApiCall(newTasks);
    } catch (error) {
      console.error('Error editing task:', error);
      setHistory((prev) => ({
        ...prev,
        present: prevState,
      }));
    }   
  };

  // //Derived State total no.of tasks

  // const totalTasks = tasks.length;

  // //no.of completed tasks
  // const completedTasks = tasks.filter(task => task.completed).length;

  // //no.of pending tasks
  // const pendingTasks = tasks.filter(task => !task.completed).length;

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
