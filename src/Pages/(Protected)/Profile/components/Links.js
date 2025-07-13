import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import '../styles/ProfilePage.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Server_uri } from '../../../../url';

export default function Links({ userdata, role }) {
  const [linkInput, setLinkInput] = useState(false);
  const [Links, setLinks] = useState([]);
  const [newLink,setNewLink] = useState('');
  const linkInputRef = useRef();

  useEffect(()=>{
    setLinks(userdata.otherlinks);
  },[])

  const handleAddLink = async () => {
    if (newLink.trim() === '') {
      alert('Please enter a valid link.');
      return;
    }

    try {
      await axios.put(`${Server_uri}/${role}_update`, {
        id: userdata.id,
        data: newLink,
        key: 'otherlinks',
      });
      setLinks(prev=>[...prev,newLink]);
    } catch (err) {
      console.error('Error adding link:', err);
    } finally {
      setNewLink('');
      setLinkInput(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Links</h2>
        <span style={{ cursor: 'pointer' }} onClick={() => setLinkInput(prev => !prev)}>
          <AddIcon />
        </span>
      </div>

      <div className="activity-feed" style={{ display: 'flex', gap: '20px', flexDirection: 'column' }} ref={linkInputRef}>
        {/* LinkedIn profile */}
        {userdata.linkedinProfile && (
          <div className="activity-item">
            <div className="activity-content">
              <div>{userdata.linkedinProfile}</div>
            </div>
          </div>
        )}

        {/* Other links */}
        {Links.map((link, index) => (
          <div className="activity-item" key={index}>
            <div className="activity-content">
              <div>{link}</div>
            </div>
          </div>
        ))}

        {/* Input for new link */}
        {linkInput && (
            <div>
          <div className="activity-item">
            <TextField
              fullWidth
              placeholder="Enter new link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
          </div>
          <Button onClick={handleAddLink} variant="contained" style={{ marginTop: '10px' }}>
              Add Link
            </Button>
            </div>
        )}
      </div>
    </div>
  );
}
