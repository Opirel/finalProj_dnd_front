import React, { useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Fab, Modal, TextField, Button } from '@mui/material';
import { useSessions } from '../context/allContext';
import { Session } from '../context/types';
import { v4 as uuidv4 } from 'uuid';


const StartNewChat = () => {
  const { createSession } = useSessions();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStartChat = async () => {
    const uuid =  uuidv4()
    const requestBody: Session = {
      title: title,
      sessionID: uuid,
      conversation: [
        {
          sender: "bot",
          time: new Date().toISOString(),
          message: "Hello, how can I assist you today?"
        }
      ]
    };
    console.log();
    
    try {
      await createSession(requestBody);
      handleClose(); // Close the modal after starting the chat
    } catch (error) {
      console.error('There was an error starting the chat session:', error);
    }
  };

  return (
    <Box>
      <Fab 
        color="secondary" 
        aria-label="toggle drawer" 
        onClick={handleOpen}
        style={{ 
          // position: '', 
          marginRight :"opx",
          // top: "0.5vw", 
          // // right: 500,
          //   left: '70vw',
          fontSize: 'large'
        }}
      >
        <AddBoxIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="start-chat-modal-title"
        aria-describedby="start-chat-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="start-chat-modal-title">Start New Chat</h2>
          <TextField
            fullWidth
            id="chat-title"
            label="Chat Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleStartChat}
            style={{ marginTop: '16px' }}
          >
            Start Chat
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default StartNewChat;
