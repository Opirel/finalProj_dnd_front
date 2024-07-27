import React from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Fab } from '@mui/material';
import { useSessions } from '../context/allContext';
import { Session, SessionContextType } from '../context/types';
import { v4 as uuidv4 } from 'uuid';

const StartNewChat = () => {
  const { createSession } = useSessions();

  const handleStartChat = async () => {
    const requestBody  : Session  =  {
      title: "New Chat", // Add the name property

      sessionID: uuidv4(),
      conversation: [
        {
          sender: "bot", // Ensure sender is either "bot" or "user"
          time: new Date().toISOString(),
          message: "Hello, how can I assist you today?"
        }
      ]
    };

    try {
      await createSession(requestBody);
    } catch (error) {
      console.error('There was an error starting the chat session:', error);
    }
  };

  return (
    <Fab 
      color="secondary" 
      aria-label="toggle drawer" 
      onClick={handleStartChat}
      style={{ 
        position: 'fixed', 
        top: 20, 
        right: 500,
        fontSize: 'large'
      }}
    >
      <AddBoxIcon/>
    </Fab>
  );
};

export default StartNewChat;
