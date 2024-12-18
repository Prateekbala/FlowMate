"use client";
import { useState } from "react";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const actions = [
    "AI by Zapier",
    "Filter",
    "Formatter",
    "Paths",
    "Webhooks",
    "Code",
    "Looping",
  ];

  // Background dragging handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Modal handlers
  const handleTriggerClick = () => {
    setShowModal(true);
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    setShowModal(false);
    setShowSidebar(true);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold text-gray-700">My App</h1>
        <div className="flex space-x-4">
          <button className="text-blue-500 font-medium hover:underline">
            Home
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Publish
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="h-screen w-screen overflow-hidden bg-white"
        style={{
          backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          cursor: isDragging ? "grabbing" : "-webkit-grab",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        {/* Draggable Area */}
        <div
          className="relative"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {/* Trigger Box */}
          <div
            className="border-2 border-dotted border-blue-400 bg-white shadow-md rounded-md p-4 mb-6 w-96 cursor-pointer"
            onClick={handleTriggerClick}
          >
            <div className="flex items-center space-x-2">
              <span className="bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                ⚡ Trigger
              </span>
              <h2 className="text-lg font-semibold text-gray-700">
                1. Select the event that starts your Zap
              </h2>
            </div>
          </div>

          {/* Action Box */}
          <div
            className="border-2 border-dotted border-gray-400 bg-white shadow-md rounded-md p-4 w-96 cursor-pointer"
            onClick={handleTriggerClick}
          >
            <div className="flex items-center space-x-2">
              <span className="bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                ⚙️ Action
              </span>
              <h2 className="text-lg font-semibold text-gray-700">
                2. Select the event for your Zap to run
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select an Action</h2>
            <ul className="space-y-2">
              {actions.map((action) => (
                <li
                  key={action}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => handleActionSelect(action)}
                >
                  {action}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-red-500 font-medium hover:underline"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 transition-transform transform translate-x-0"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <h2 className="text-xl font-semibold mb-4">Configure Action</h2>
          <label className="block mb-2 text-gray-700 font-medium">
            Selected Action:
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setShowSidebar(false)}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
