import React, { useState, useEffect } from "react";

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Polling mechanism to check for new notifications
    const interval = setInterval(() => {
      // Simulated notification check
      checkForNotifications();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const checkForNotifications = () => {
    // Replace with actual backend call to check for time-based events
    const currentTime = new Date();
    const potentialNotification = checkTimeBasedEvents(currentTime);

    if (potentialNotification) {
      addNotification(potentialNotification);
    }
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};

// Helper function to check time-based events
const checkTimeBasedEvents = (currentTime: Date): string | null => {
  // Example: Check for specific time-based conditions
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();

  if (hour === 12 && minute === 0) {
    return "It's noon! Time for lunch break.";
  }

  return null;
};

export default NotificationCenter;
