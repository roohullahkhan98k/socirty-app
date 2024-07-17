import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaUserEdit, FaCheckCircle, FaHistory, FaSignOutAlt, FaCalendarPlus, FaUsers, FaUserCog } from 'react-icons/fa';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function Home() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Roohullah',
    profilePicture: '/path/to/profile-photo.jpg'
  });
  const navigate = useNavigate();
  const [isProfileEnlarged, setIsProfileEnlarged] = useState(false);

  useEffect(() => {
    const storedUserData = window.localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Function to send notification
  const sendNotification = async () => {
    try {
      await axios.post('http://localhost:8000/api/notifications', { message: notificationMessage });
      console.log('Notification sent');
      setNotificationMessage('');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Function to send scheduled notification
  const sendScheduledNotification = () => {
    // Validate notification time
    if (!notificationTime) {
      alert('Please set a notification time.');
      return;
    }
    
    // Convert notification time to milliseconds
    const scheduledTime = new Date(notificationTime).getTime();
    const currentTime = new Date().getTime();

    // Validate if the scheduled time is in the future
    if (scheduledTime <= currentTime) {
      alert('Please set a future notification time.');
      return;
    }

    // Calculate delay until notification time
    const delay = scheduledTime - currentTime;

    // Display notification schedule message
    const scheduledTimeString = new Date(scheduledTime).toLocaleString();
    alert(`Notification scheduled for ${scheduledTimeString}.`);

    // Set timeout to send notification
    setTimeout(() => {
      sendNotification();
    }, delay);
  };

  // Function to navigate to EditAdmin page
  const goToEditAdmin = () => {
    navigate('/EditAdmin');
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Function to navigate to Approve page
  const goToApproveResidents = () => {
    navigate('/Approve');
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Function to navigate to Notification History page
  const goToNotificationHistory = () => {
    navigate('/Editnoti');
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Function to navigate to Residents page
  const goToResidents = () => {
    navigate('/Residents');
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Function to navigate to Service Providers page
  const goToServiceProviders = () => {
    navigate('/Service');
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Function to toggle profile picture size
  const toggleProfileSize = () => {
    setIsProfileEnlarged(!isProfileEnlarged);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ccc', background: '#fff' }}>
        <FaBars onClick={() => setIsMenuOpen(true)} style={{ fontSize: '24px', cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '18px', flex: '1', justifyContent: 'center' }}>
          <span>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <img 
            src={userData.profilePicture} 
            alt="Profile" 
            style={{ 
              width: isProfileEnlarged ? '120px' : '60px', 
              height: isProfileEnlarged ? '120px' : '60px', 
              borderRadius: '50%', 
              border: '2px solid #28a745', 
              marginRight: '10px',
              cursor: 'pointer',
              transition: 'width 0.3s, height 0.3s'
            }} 
            onClick={toggleProfileSize}
          />
          <span style={{ marginRight: '10px' }}>{userData.name}</span>
        </div>
      </div>

      {/* Profile Picture Modal */}
      {isProfileEnlarged && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              style={{ 
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                border: '2px solid #28a745', 
                cursor: 'pointer'
              }} 
              onClick={toggleProfileSize}
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%' }}>
          <h2 style={{ color: '#2980b9', marginBottom: '20px' }}>Generate Notification</h2>
          <textarea
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            placeholder="Enter notification message..."
            style={{ width: '100%', minHeight: '200px', marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', resize: 'vertical' }}
          />
          <input
            type="datetime-local"
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <button onClick={sendNotification} style={{ padding: '12px 20px', borderRadius: '5px', border: 'none', background: '#2980b9', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s', marginRight: '10px' }}>
            <FaCalendarPlus style={{ marginRight: '5px' }} /> Send Notification
          </button>
          <button onClick={sendScheduledNotification} style={{ padding: '12px 20px', borderRadius: '5px', border: 'none', background: '#2980b9', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }}>
            <FaCalendarPlus style={{ marginRight: '5px' }} /> Schedule Notification
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #ccc', background: '#fff' }}>
        <Link to="/" style={{ padding: '10px 20px', textDecoration: 'none', color: '#2980b9', borderRadius: '5px', border: '1px solid #2980b9', minWidth: '150px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' }}>Logout</Link>
      </div>

      {/* Drawer */}
      <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                border: '2px solid #28a745', 
                cursor: 'pointer',
                marginRight: '10px'
              }} 
              onClick={toggleProfileSize}
            />
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{userData.name}</span>
          </div>
          <List>
            <ListItem button onClick={goToEditAdmin}>
              <ListItemIcon><FaUserEdit /></ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem button onClick={goToApproveResidents}>
              <ListItemIcon><FaCheckCircle /></ListItemIcon>
              <ListItemText primary="Approve Serviceproviders" />
            </ListItem>
            <ListItem button onClick={goToNotificationHistory}>
              <ListItemIcon><FaHistory /></ListItemIcon>
              <ListItemText primary="Notification History" />
            </ListItem>
            <ListItem button onClick={goToResidents}>
              <ListItemIcon><FaUsers /></ListItemIcon>
              <ListItemText primary="Residents" />
            </ListItem>
            <ListItem button onClick={goToServiceProviders}>
              <ListItemIcon><FaUserCog /></ListItemIcon>
              <ListItemText primary="Service Providers" />
            </ListItem>
            <ListItem button onClick={() => setIsMenuOpen(false)}>
              <ListItemIcon><FaSignOutAlt /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Home;
