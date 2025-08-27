import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../AdminContext/AdminContext";

const NotificationAddGetDelete = () => {
  const { getNotification, deleteNotification, addNotification } =
    useContext(AdminContext);

  const [notification, setNotification] = useState("");
  const [newNotification, setNewNotification] = useState("");

  useEffect(() => {
    const fetchNotification = async () => {
      const notificationData = await getNotification();
      if (notificationData) {
        setNotification(notificationData.notification);
      }
    };
    fetchNotification();
  }, [getNotification]);

  const handleDeleteNotification = async () => {
    if (await deleteNotification()) {
      setNotification("");
    }
  };

  const handleAddNotification = async () => {
    if (!newNotification.trim()) return;
    if (await addNotification(newNotification)) {
      setNotification(newNotification);
      setNewNotification("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#20265d] rounded-lg shadow-md border border-gray-200 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Notification Manager
      </h2>

      <div className="mb-4">
        <label className="block text-white font-medium mb-1">
          Current Notification:
        </label>
        {notification ? (
          <div className="bg-gray-900 p-3 rounded-md flex justify-between items-center">
            <textarea className="text-white min-h-[200px] w-full">{notification}</textarea>
            <button
              onClick={handleDeleteNotification}
              className="ml-4 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ) : (
          <p className="text-gray-500 italic">No notification to display.</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="newNotification"
          className="block text-white font-medium mb-1"
        >
          Add New Notification:
        </label>
        <textarea
          id="newNotification"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Enter new notification"
          className="w-full p-2 border border-gray-300 min-h-[200px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleAddNotification}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
      >
        Add Notification
      </button>
    </div>
  );
};

export default NotificationAddGetDelete;
