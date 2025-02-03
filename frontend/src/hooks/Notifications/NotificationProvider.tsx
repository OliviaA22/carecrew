import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../axios/Axios";
import { Notification } from "../../data/Types";
import axios from "axios";

interface NotificationContextType {
  notifications: Notification[];
  unreadNotifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "is_read">) => void;
  markAsRead: (id: number) => void;
  fetchNotifications: () => Promise<void>;
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

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get<Notification[]>(
        "/api/notifications/ward"
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 2 * 60 * 1000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.is_read);

  const addNotification = (
    notification: Omit<Notification, "id" | "is_read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [...prev, newNotification]);
    setShowPopup(true);
  };

  const markAsRead = async (id: number) => {
    try {
      await axiosInstance.put(`/api/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Error marking notification as read:", error);
      }
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifications,
        addNotification,
        markAsRead,
        fetchNotifications,
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
