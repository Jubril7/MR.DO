import { useState } from "react";
import {
  Search,
  Pencil,
  CheckSquare,
  Menu,
  Settings,
} from "lucide-react";
import CatLogo from "../assets/002.png";
import { askGemini } from "../components/gemini";
import TodoPage from "../components/Todolist";
import CompletedList from "../components/Completed";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // Shared tasks
  const [tasks, setTasks] = useState([]);

  //  AI state
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAIActivate = () => setShowAI(!showAI);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const reply = await askGemini(input);
      setResponse(reply);
    } catch (err) {
      setResponse("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-60" : "w-16"
        } h-full bg-orange-100 flex flex-col justify-between p-4 transition-[width] duration-300 ease-linear rounded-2xl mt-4 shadow-md overflow-hidden`}
      >
        {/* Top Menu Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Menu
                size={24}
                className="text-gray-700 cursor-pointer hover:text-orange-600"
                onClick={() => setIsOpen(!isOpen)}
              />
              <span
                className={`font-bold text-lg whitespace-nowrap transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
                }`}
              >
                MENU
              </span>
            </div>

            <img
              src={CatLogo}
              alt="AI Logo"
              className={`w-8 h-8 cursor-pointer hover:scale-110 transition-all duration-300 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              onClick={handleAIActivate}
            />
          </div>

          {/* Menu items */}
          <ul className="space-y-4">
            <li className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
              <Search size={20} />
              <span
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
                }`}
              >
                Search Task
              </span>
            </li>

            <li
              className="flex items-center gap-2 cursor-pointer hover:text-orange-600"
              onClick={() => {
                setShowTodo(true);
                setShowCompleted(false);
              }}
            >
              <Pencil size={20} />
              <span
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
                }`}
              >
                Create New List
              </span>
            </li>

            <li
              className="flex items-center gap-2 cursor-pointer hover:text-orange-600"
              onClick={() => {
                setShowCompleted(true);
                setShowTodo(false);
              }}
            >
              <CheckSquare size={20} />
              <span
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
                }`}
              >
                Completed List
              </span>
            </li>
          </ul>

          {/* Previous List Section */}
          <div
            className={`mt-6 transition-all duration-300 overflow-hidden ${
              isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
            }`}
          >
            <h3 className="text-sm font-semibold text-gray-600">
              PREVIOUS LIST
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 transition">
                Previous To-Do List 1
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 transition">
                Previous To-Do List 2
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 transition">
                Previous To-Do List 3
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 transition">
                Previous To-Do List 4
              </button>
            </div>
          </div>
        </div>

        {/* Settings Section - always icon, label only when open */}
        <div
          className="flex items-center gap-2 mt-4 cursor-pointer hover:text-orange-600"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={20} />
          <span
            className={`transition-all duration-300 overflow-hidden ${
              isOpen ? "opacity-100 w-auto ml-1" : "opacity-0 w-0"
            }`}
          >
            Settings
          </span>
        </div>
      </div>

      {/* ToDo Card */}
      {showTodo && (
        <div className="mt-4 animate-slideIn">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-[400px] max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">📝Mr.DO List</h2>
              <button
                onClick={() => setShowTodo(false)}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✖
              </button>
            </div>
            <TodoPage tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      )}

      {/* Completed Card */}
      {showCompleted && (
        <div className="mt-4 animate-slideIn">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-[400px] max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                ✅ Completed List
              </h2>
              <button
                onClick={() => setShowCompleted(false)}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✖
              </button>
            </div>
            <CompletedList tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      )}

      {/* AI Drawer */}
      {showAI && (
        <div className="fixed right-4 top-20 w-96 h-[80vh] bg-white border border-gray-300 rounded-2xl shadow-lg p-4 flex flex-col transition-all duration-300 z-40">
          <h2 className="font-bold text-lg mb-2">Hello there! 👋</h2>

          <div className="flex-1 overflow-y-auto border p-2 rounded-lg mb-3">
            {response ? (
              <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
            ) : (
              <p className="text-gray-500">I’m Mr.Do,let me help you organize your Tasks …</p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add task..."
              className="border rounded-lg p-2 w-full focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
