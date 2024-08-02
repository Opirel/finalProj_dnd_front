import React, { useState, useEffect } from 'react';
import { useSessions } from '../context/allContext';
import { Session } from '../context/types';
import { Drawer, Fab, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import StartNewChat from './StartNewChat';

interface ChatListProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ isOpen, toggleSidebar }) => {
  const { deleteSession, getSessionsdata } = useSessions();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await getSessionsdata();
      if (sessionsData) {
        setSessions(sessionsData);
      }
    };

    fetchSessions();
  }, [getSessionsdata]);

  // Debug log to check the sessions data
  console.log('Sessions from chatlist:', sessions);

  const pathUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleDelete = async (sessionID: string) => {
    try {
      await deleteSession(sessionID);
      setSessions(prevSessions => prevSessions.filter(session => session.sessionID !== sessionID));
    } catch (error) {
      console.error('There was an error deleting the session:', error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleSidebar}
      variant="persistent"
      sx={{
        width: isOpen ? 240 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: isOpen ? 240 : 0, boxSizing: 'border-box' },
        justifyContent: 'center',
      }}
    >
      <Fab onClick={toggleSidebar}>
        <CloseIcon sx={{ position: 'relative' }} />
      </Fab>

      <StartNewChat />
      <div style={{ padding: 16 }}>
        <h1>Sessions</h1>
      </div>
      <List>
        {sessions.length > 0 ? (
          sessions.map((session: Session) => (
            <ListItem key={session.sessionID} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(session.sessionID)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemButton component="a" href={`${pathUrl}/sessions/${session.sessionID}`}>
                <ListItemText primary={session.title} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No sessions available" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default ChatList;
