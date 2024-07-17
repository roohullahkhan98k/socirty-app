import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EditProfile() {
  const [name, setName] = useState('Roohullah');
  const [profilePicture, setProfilePicture] = useState('/path/to/profile-photo.jpg');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    // Simulate API call to save changes
    setTimeout(() => {
      setSuccessMessage('Profile successfully updated!');
      setErrorMessage('');
      // Pass updated data to Home component
      window.localStorage.setItem('userData', JSON.stringify({ name, profilePicture }));
    }, 1000);
  };

  const goBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: '100vh', backgroundColor: '#f0f0f0', color: '#000' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ccc', background: '#fff' }}>
        <button onClick={goBack} style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', borderRadius: '5px', fontSize: '16px', color: '#333', fontWeight: 'bold', textDecoration: 'underline' }}>
          Back
        </button>
        <h3>Admin Dashboard</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={profilePicture} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #28a745', marginRight: '10px' }} />
          <span style={{ fontWeight: 'bold' }}>{name}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
        <div style={{ backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={{ marginBottom: '5px', display: 'block' }}>Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="profile-picture" style={{ marginBottom: '5px', display: 'block' }}>Profile Picture:</label>
            <input type="file" id="profile-picture" onChange={handleProfilePictureChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>
          <button onClick={saveChanges} style={{ padding: '12px 20px', borderRadius: '5px', border: 'none', background: '#2980b9', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s', marginRight: '10px' }}>Save Changes</button>
          {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', borderTop: '1px solid #ccc', background: '#fff' }}>
        <Link to="/" style={{ padding: '10px 20px', textDecoration: 'none', color: '#2980b9', borderRadius: '5px', border: '1px solid #2980b9' }}>Logout</Link>
      </div>
    </div>
  );
}

export default EditProfile;
