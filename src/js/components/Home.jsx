import React from "react";
import { useState } from "react";
  
  export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && newTask.trim()) {
        setTasks([...tasks, newTask.trim()]);
        setNewTask("");
      }
    };
  
    const removeTask = (index) => {
      setTasks(tasks.filter((_, i) => i !== index));
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Añadir una tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ul>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No hay tareas, añadir tareas</p>
          ) : (
            tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => removeTask(index)}>❌</button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }