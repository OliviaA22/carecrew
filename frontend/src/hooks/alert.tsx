import React, { useState, useEffect } from "react";
import axios from "axios";

interface Notification {
  id: number;
  message: string;
  notification_type: "task" | "reminder" | "alert";
  is_read: boolean;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications/ward");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.notification_type}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
