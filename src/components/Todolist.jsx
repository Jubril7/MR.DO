import { useState } from "react";
import { PlusCircle, Check, Trash2, Pencil, Save, Calendar } from "lucide-react";

export default function TodoPage({ tasks, setTasks }) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Organize with Mr Do
  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
      priority,
      dueDate,
    };
    setTasks([newTask, ...tasks]);
    setTaskText("");
    setPriority("low");
    setDueDate("");
  };

  //  Toggle Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🗑 Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //  Edit Task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  //  Save Task Edit
  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Priority Colors
  const priorityColors = {
    low: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    high: "bg-red-100 text-red-700 border-red-300",
  };

  // Priority Sorting Order
  const sortedTasks = tasks.slice().sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      {/* Organize with Mr Do */}
      <div className="w-full max-w-md flex flex-col gap-2 mb-6">
        <div className="flex">
          <input
            className="flex-grow p-3 rounded-l-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-r-lg"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Priority + Date */}
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-lg flex-1"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-lg flex-1"
          />
        </div>
      </div>

      {/* Task List */}
      <ul className="w-full max-w-md space-y-4">
        {sortedTasks.length === 0 && (
          <li className="text-gray-500 text-center">
            No tasks yet. Organize with Mr Do!
          </li>
        )}

        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-start justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition border-l-4 ${
              task.priority === "low"
                ? "border-green-400"
                : task.priority === "medium"
                ? "border-yellow-400"
                : "border-red-500"
            }`}
          >
            {/* Task Content */}
            <div className="flex items-start flex-grow gap-3">
              {editingId === task.id ? (
                <input
                  className="flex-grow p-2 border rounded-md"
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                />
              ) : (
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`flex items-start gap-3 text-left flex-grow ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  <Check
                    size={18}
                    className={
                      task.completed ? "text-green-500" : "text-gray-300"
                    }
                  />
                  <span className="break-all whitespace-pre-wrap">
                    {task.text}
                  </span>
                </button>
              )}

              {/* Priority Badge */}
              <span
                className={`text-xs px-2 py-1 rounded-lg border ${priorityColors[task.priority]}`}
              >
                {task.priority.toUpperCase()}
              </span>

              {/* Due Date */}
              {task.dueDate && (
                <span className="flex items-center text-xs text-gray-500 gap-1">
                  <Calendar size={14} /> {task.dueDate}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center">
              {editingId === task.id ? (
                <button
                  onClick={() => saveEdit(task.id)}
                  className="text-green-500 hover:text-green-700 ml-2"
                >
                  <Save size={18} />
                </button>
              ) : (
                <button
                  onClick={() => startEditing(task)}
                  className="text-blue-500 hover:text-blue-700 ml-2"
                >
                  <Pencil size={18} />
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
