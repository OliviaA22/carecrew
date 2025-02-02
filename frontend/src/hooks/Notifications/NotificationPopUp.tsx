import React from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../data/Types";

interface NotificationPopupProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notification,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/news");
    onClose();
  };

  return (
    <div className="notification-popup">
      <p>{notification.message}</p>
      <p>
        Patient: {notification.patient.first_name}{" "}
        {notification.patient.last_name}
      </p>
      <p>Medication: {notification.medication_item.medication_plan.name}</p>
      <p>Scheduled Time: {notification.medication_item.scheduled_time}</p>
      <button onClick={handleViewAll}>View All</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationPopup;
