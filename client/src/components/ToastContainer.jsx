import React, { useState } from "react";

const Toast = ({ id, message, type = "info", onClose }) => {
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed right-5 top-5 w-72 p-4 mb-2 rounded shadow-lg ${typeStyles[type]} flex items-center justify-between`}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)} className="ml-4 text-white hover:text-gray-300">
        ✕
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000); // Auto-dismiss after 3 seconds
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed right-5 top-5">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;

// Example usage in a component
const SomeComponent = () => {
  const handleAction = () => {
    // Example to add toast, use this function wherever you need to show a toast
    addToast("This is a success message!", "success");
  };

  return (
    <button onClick={handleAction}>Show Toast</button>
  );
};
