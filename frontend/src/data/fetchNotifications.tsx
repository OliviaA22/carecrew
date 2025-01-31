import axios from "axios";

interface Notification {
  id: number;
  message: string;
  notification_type: "task" | "reminder" | "alert";
  is_read: boolean;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get("/api/notifications/ward");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
