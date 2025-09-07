import { Trash2, Calendar } from "lucide-react";

export default function CompletedList({ tasks, setTasks }) {
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completed = tasks.filter((task) => task.completed);

  //  same priority colors as TodoPage
  const priorityColors = {
    low: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    high: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <ul className="w-full max-w-2xl space-y-4">
      {completed.length === 0 && (
        <li className="text-gray-500 text-center">No tasks completed yet.</li>
      )}

      {completed.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition border-l-4 ${
            task.priority === "low"
              ? "border-green-400"
              : task.priority === "medium"
              ? "border-yellow-400"
              : "border-red-500"
          }`}
        >
          <div className="flex items-center gap-3 flex-grow">
            {/* Task text (wraps long words properly) */}
            <span className="text-lg font-medium text-gray-500 line-through break-all whitespace-pre-wrap">
              {task.text}
            </span>

            {/* Priority badge */}
            <span
              className={`text-xs px-2 py-1 rounded-lg border ${priorityColors[task.priority]}`}
            >
              {task.priority?.toUpperCase()}
            </span>

            {/* Due date */}
            {task.dueDate && (
              <span className="flex items-center text-xs text-gray-400 gap-1">
                <Calendar size={14} /> {task.dueDate}
              </span>
            )}
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
