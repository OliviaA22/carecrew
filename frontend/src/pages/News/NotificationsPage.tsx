import React, { useState, useEffect } from "react";
import { useAuth } from "../../pages/LogIn/AuthContext";
import PageLayout from "../../components/ui/layout/PageLayout";
import axios from "axios";
import axiosInstance from "../../axios/Axios";

interface Notification {
  id: number;
  message: string;
  created_at: string;
  type: string;
  is_read: boolean;
}

interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

type TimelineItem = Notification | Shift;

const NotificationsPage: React.FC = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useAuth();

  const getItemTimestamp = (item: unknown): string => {
    if (typeof item === "object" && item !== null) {
      if ("created_at" in item && typeof item.created_at === "string") {
        return item.created_at;
      } else if ("start_time" in item && typeof item.start_time === "string") {
        return item.start_time;
      }
    }
    console.error("Invalid item type:", item);
    return ""; // Return an empty string for invalid items
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const [notificationsResponse, shiftsResponse] = await Promise.all([
          axios.get<Notification[]>("/api/notifications/ward", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Shift[]>("/api/shifts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("Raw notifications:", notificationsResponse.data);
        console.log("Raw shifts:", shiftsResponse.data);

        const notifications = Array.isArray(notificationsResponse.data)
          ? notificationsResponse.data
          : [];
        const shifts = Array.isArray(shiftsResponse.data)
          ? shiftsResponse.data
          : [];

        const combinedItems = [...notifications, ...shifts]
          .filter(
            (item): item is TimelineItem =>
              typeof item === "object" && item !== null
          )
          .sort((a, b) => {
            const timestampA = getItemTimestamp(a);
            const timestampB = getItemTimestamp(b);
            if (timestampA && timestampB) {
              return (
                new Date(timestampB).getTime() - new Date(timestampA).getTime()
              );
            }
            return 0;
          });

        setTimelineItems(combinedItems);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            `Failed to fetch data: ${
              err.response?.data?.message || err.message
            }`
          );
        } else {
          setError("An unexpected error occurred");
        }
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getItemIcon = (item: TimelineItem): string => {
    if ("type" in item) {
      switch (item.type) {
        case "medication":
          return "💊";
        case "patient":
          return "🏥";
        case "alert":
          return "🚨";
        default:
          return "📢";
      }
    } else {
      return "👤";
    }
  };

  const renderTimelineItem = (item: TimelineItem) => {
    if ("type" in item) {
      return (
        <li
          key={item.id}
          className={`p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
            item.is_read ? "bg-gray-50" : "bg-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 text-2xl">{getItemIcon(item)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.message}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
            {!item.is_read && (
              <div className="inline-flex items-center text-sm font-semibold text-indigo-600">
                New
              </div>
            )}
          </div>
        </li>
      );
    } else {
      return (
        <li
          key={item.id}
          className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out bg-white"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 text-2xl">{getItemIcon(item)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {`${item.user.first_name} ${item.user.last_name}'s shift`}
              </p>
              <p className="text-sm text-gray-500">
                {`${new Date(item.start_time).toLocaleString()} - ${new Date(
                  item.end_time
                ).toLocaleString()}`}
              </p>
            </div>
          </div>
        </li>
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text="Notifications & Shifts">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Ward Timeline</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {timelineItems.length === 0 ? (
            <p className="p-4 text-gray-500">
              No items to display at this time.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {timelineItems.map(renderTimelineItem)}
            </ul>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NotificationsPage;
