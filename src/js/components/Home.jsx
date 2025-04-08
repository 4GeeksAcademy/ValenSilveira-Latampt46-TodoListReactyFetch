import React from "react";
import { useState, useEffect } from "react";
const API_URL = "https://playground.4geeks.com/todo"


export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
 

  //crea usuario
  const createUser = async () => {
   
    try {
      const response = await fetch(API_URL + "/users/ValenSilveira", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todos: [] })
      });
      if (response.status !== 200) {
        console.error("Error al crear usuario:", response.status);
      } else {
        const data = await response.json();
        console.log("Usuario creado:", data);
        console.log(createuser)
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }

  }

  //funcion para Get
  async function getUsers() {
    try {
      const response = await fetch(API_URL + "/users/ValenSilveira",)
      if (response.status !== 200) {
        console.log(`Error al obtener tareas`, response.status);
        return null
      }
      const data = await response.json()
      setTasks(data.todos)
    } catch (error) {
      console.log(`Error`)
    }

  }

  useEffect(() => {
    async function initialize() {
      const userExists = await checkUserExists(); // Verifica si el usuario ya está creado
      if (!userExists) {
        await createUser(); // Solo lo crea si no existe
      }
      await getUsers(); // Obtiene las tareas del usuario
    }
    initialize();
  }, []);

  const checkUserExists = async () => {
    try {
      const response = await fetch(API_URL + "/users/ValenSilveira");
      return response.status === 200; // Devuelve true si el usuario existe
    } catch (error) {
      console.error("Error verificando usuario:", error);
      return false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim()) {
      addTask(newTask.trim()); // Sincroniza con la API
      setTasks([...tasks, { label: newTask.trim(), done: false }]); // Actualiza el estado local
      setNewTask("");
    }
  };

  const addTask = async (taskLabel) => {
    const updatedTasks = [...tasks, { label: taskLabel, done: false }];
    try {
      const response = await fetch(API_URL + "/users/ValenSilveira", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todos: updatedTasks }),
      });
      if (!response.ok) {
        console.error("Error al añadir tarea:", response.status);
        return;
      }
      const data = await response.json();
      setTasks(data.todos); // Actualiza el estado con los datos de la API
      console.log("Tareas actualizadas:", data.todos);
    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  const handleClearList = async () => {
    try {
      const response = await fetch(API_URL + "/users/ValenSilveira", {
        method: "DELETE", 
      
      });

      if (response.status) {
        setTasks([]); // Vacía la lista en el front-end
      } else {
        console.error("Error al limpiar la lista:", response.status);
      }
    } catch (error) {
      console.error("Error al eliminar la lista:", error);
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
          <p className="text-gray-500 text-center">No hay tareas, añade una tarea</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task.label}
              <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))
          
        )}
      </ul>
      <p>Tareas pendientes: {tasks.length}</p>
    <button onClick={handleClearList} style={{padding: "10px 20px", fontSize: "16px"}}>Limpiar lista</button>
   </div >
  );
}


