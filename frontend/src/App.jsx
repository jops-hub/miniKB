import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/api";
import TaskForm from "./components/TaskForm";
import KanbanColumn from "./components/KanbanColumn";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return <p>Carregando tarefas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
   async function handleTaskCreated(task) {
     try {
    const createdTask = await createTask(task);

    setTasks((currentTasks) => [
      createdTask,
      ...currentTasks,
    ]);
  } catch (error) {
    setError("Não foi possível criar a tarefa.");
  }
}
  async function handleTaskUpdate(id, task) {
    try {
    await updateTask(id, task);

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === id
          ? { ...currentTask, ...task }
          : currentTask
      )
    );
  } catch (error) {
    setError("Não foi possível atualizar a tarefa.");
  }
}
  async function handleTaskDelete(id) {
    try {
    await deleteTask(id);

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );
  } catch (error) {
    setError("Não foi possível excluir a tarefa.");
  }
}
  return (
    <main className="app">
      <header className="app-header">
        <h1>Mini Kanban</h1>

        <p>Gerencie suas tarefas</p>
      </header>
      <TaskForm onTaskCreated={handleTaskCreated} />
      
      <div className="kanban-board">

        <KanbanColumn
         title="TODO"
         status="todo"
         tasks={tasks}
         onUpdate={handleTaskUpdate}
         onDelete={handleTaskDelete}
       />

        <KanbanColumn
         title="DOING"
         status="doing"
         tasks={tasks}
         onUpdate={handleTaskUpdate}
         onDelete={handleTaskDelete}
       />       

        <KanbanColumn
        title="DONE"
        status="done"
        tasks={tasks}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
       />
      </div>
    </main>
  );
}

export default App;