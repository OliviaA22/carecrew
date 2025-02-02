import React from "react";
import { useNotifications } from "./NotificationProvider";

const NotificationCenter: React.FC = () => {
  const { unreadNotifications } = useNotifications();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Unread Notifications</h2>
      {unreadNotifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {unreadNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 rounded ${
                notification.type === "alert"
                  ? "bg-red-100"
                  : notification.type === "reminder"
                  ? "bg-yellow-100"
                  : "bg-blue-100"
              }`}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationCenter;
