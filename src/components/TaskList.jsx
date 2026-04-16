import TaskItem from "./TaskItem";

const TaskList = ({ tasks, deleteTask,toggleTask
 }) => {
    return (
        <div>   
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} />
          ))}
        </div>
    );
}

export default TaskList;