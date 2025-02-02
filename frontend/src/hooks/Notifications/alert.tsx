import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/Axios";
import { Notification } from "../../data/Types";

interface NotificationCenterProps {
  wardId: number;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ wardId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/notifications/ward/${wardId}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [wardId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 rounded ${
                notification.notification_type === "alert"
                  ? "bg-red-100"
                  : notification.notification_type === "reminder"
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
