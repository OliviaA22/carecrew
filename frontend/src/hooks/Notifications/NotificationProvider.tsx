import React, { createContext, useState, useContext, ReactNode } from "react";
import { Notification } from "../../data/Types";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "is_read">) => void;
  markAsRead: (id: number) => void;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const addNotification = (
    notification: Omit<Notification, "id" | "is_read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(), // Generate a unique ID
      is_read: false,
      created_at: new Date().toISOString(),
      type: notification.notification_type,
    };
    setNotifications([...notifications, newNotification]);
    setShowPopup(true);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
