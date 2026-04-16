import TaskItem from "./TaskItem";
import React from "react";

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

//memorize the list
export default React.memo (TaskList);