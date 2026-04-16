const TaskList = ({ tasks }) => {
    return (
        <div>   
           {tasks.map(task => (
            <p key={task.id}>{task.text}</p>
           ))}
        </div>
    );
}

export default TaskList;