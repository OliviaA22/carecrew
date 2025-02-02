import React, { useState, useEffect } from "react";
import PageLayout from "../../components/ui/layout/PageLayout";
import { useNotifications } from "../../hooks/Notifications/NotificationProvider";
import { Notification } from "../../data/Types";
import { useNavigate } from "react-router-dom";

const NotificationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const safeParseDate = (dateString: string): Date => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDetailsClick = (notification: Notification) => {
    navigate(`/details/${notification.patient.id}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [notifications]);

  const getItemIcon = (item: Notification): string => {
    switch (item.type) {
      case "reminder":
        return "💊";
      case "alert":
        return "🚨";
      default:
        return "📢";
    }
  };

  const renderNotificationItem = (
    notification: Notification,
    index: number,
    array: Notification[]
  ) => {
    const isLastItem = index === array.length - 1;
    const isUnread = !notification.is_read;

    return (
      <li
        key={notification.id}
        className={`${!isLastItem ? "border-b border-gray-200" : ""} ${
          isUnread ? "bg-blue-50" : ""
        }`}
      >
        <div
          onClick={() => handleDetailsClick(notification)}
          className="p-4 hover:bg-gray-100 transition-colors duration-150 ease-in-out cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 text-2xl">
                {getItemIcon(notification)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isUnread ? "text-blue-700 font-bold" : "text-gray-900"
                  } truncate`}
                >
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {safeParseDate(notification.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {isUnread && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-150 ease-in-out"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text="Notifications">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500">
              No notifications to display at this time.
            </p>
          ) : (
            <ul>
              {notifications.map((notification, index, array) =>
                renderNotificationItem(notification, index, array)
              )}
            </ul>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NotificationsPage;
