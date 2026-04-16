import TaskItem from "./TaskItem";

const TaskList = ({ tasks=[], deleteTask,toggleTask,editTask}) => {
    return (
        <div>   
            {tasks.length === 0 ? (
                <p>No tasks available. Please add a task.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
                ))
            )}
        </div>
    );
}

export default TaskList;