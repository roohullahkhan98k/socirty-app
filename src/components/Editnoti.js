import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditNotification() {
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotificationHistory = async () => {
      try {
        const response = await axios.get('http://192.168.0.109:8000/api/notifications'); // Endpoint to fetch notification history
        setNotificationHistory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching notification history:', error);
        setIsLoading(false);
      }
    };

    fetchNotificationHistory();
  }, []);

  // Function to delete a notification
  const deleteNotification = async (notificationId) => {
    try {
      // Delete notification from the frontend list
      setNotificationHistory(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationId));

      // Delete notification from the database
      await axios.delete(`http://192.168.0.109:8000/api/notifications/${notificationId}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000', padding: '20px' }}>
      <h1 style={{ color: '#2980b9', marginBottom: '20px' }}>Notification History</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: '80%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {notificationHistory.length === 0 ? (
            <p>No notifications found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notificationHistory.map(notification => (
                <li key={notification._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <p>Sent at: {new Date(notification.createdAt).toLocaleString()}</p>
                  <button onClick={() => deleteNotification(notification._id)} style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: '#e74c3c', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s', marginTop: '10px' }}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default EditNotification;
