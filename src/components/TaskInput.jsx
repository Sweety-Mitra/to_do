import { useState } from "react";

const TaskInput = ({ addTask }) => {

    const [input, setInput] = useState("");
    const handleAdd =() => {
        if(input.trim() === "") return;
        addTask(input);
        setInput("");
    }
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    );
}

export default TaskInput;