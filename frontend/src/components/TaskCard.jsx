import { useState } from "react";

function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  async function handleUpdate(event) {
    event.preventDefault();

    await onUpdate(task.id, {
      title,
      description,
      status,
    });

    setEditing(false);
  }

  if (editing) {
    return (
      <form className="task-card" onSubmit={handleUpdate}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="todo">TODO</option>
          <option value="doing">DOING</option>
          <option value="done">DONE</option>
        </select>

        <div className="task-actions">
          <button type="submit">
            Salvar
          </button>

          <button
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      {task.description && (
        <p>{task.description}</p>
      )}

      <div className="task-actions">
        <button onClick={() => setEditing(true)}>
          Editar
        </button>

        <button onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;