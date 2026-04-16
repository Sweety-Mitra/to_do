import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem'; 

function App() {
  return (
    <div>
      <h1>Smart task Manager</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
