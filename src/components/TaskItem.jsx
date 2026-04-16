import { useState } from "react";
import React from "react";

const TaskItem = ({task, deleteTask,toggleTask,editTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleSave = () => {
        if(editedText.trim() === "") return;
        editTask(task.id, editedText);
        setIsEditing(false);
    };
    return (
        <div>

            {isEditing ? (
                <>
                    <input
                    value = {editedText}
                    onChange={(e)=>setEditedText(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    </>
            ):(
                <>
                <span
                style ={{ textDecoration: task.completed ? "line-through" : "none",}}
                >
                    {task.text}
                </span>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )
        }

            <button onClick={() => toggleTask(task.id)}>{task.completed ? "Undo" : "Complete"}</button>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
}
//prevents unnecessary re-renders
export default React.memo (TaskItem);