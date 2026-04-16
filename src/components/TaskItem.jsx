const TaskItem = ({task, deleteTask,toggleTask}) => {
    return (
        <div>   
            <span
            onClick={()=>
                toggleTask(task.id)}
                style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer"}}
            >
                {task.text}
            </span>

            <button onClick={() => toggleTask(task.id)}>{task.completed ? "Undo" : "Complete"}</button>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;