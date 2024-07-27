import  { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSessions } from '../context/allContext';
import ChatInput from './ChatInput';
import { Message } from '../context/types'; // Importing the type definition
import { Box, Paper, List, ListItem, Typography, Button, Fab } from '@mui/material';
import { DisplayMessage } from './Display_Message';
import AddBoxIcon from '@mui/icons-material/AddBox';

import StartNewChat from './StartNewChat';



const DisplayChat = () => {
  const { sessions, updateSession } = useSessions();
  const { sessionid } = useParams<{ sessionid: string }>(); // Ensuring useParams is strongly typed
  const session = sessions.find(s => s.sessionID === sessionid);
  const inputRef = useRef<HTMLInputElement>(null);

  

  const handleSendMessage = (messageText: string) => {
    if (session) {
      // Creating a new message with the correct type for 'sender'
      const newMessage: Message = {
        sender: 'user', // This now matches the 'Message' type definition exactly
        time: new Date().toISOString(),
        message: messageText
      };

      const updatedSession = {
        ...session,
        conversation: [...session.conversation, newMessage]
      };

      updateSession(session.sessionID, updatedSession);
    }
  };
  const handleMouseEnter = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className=''>
      {/* <h1>DisplayChat</h1> */}
      <Typography sx={
        { 
      display: 'flex', 
      flexDirection: 'column', 
      height: '80vh', 
      overflow: 'hidden',
      // opacity:'50%'
      
      //  color:"red"
      }
      }>
        <h1>DisplayZibi</h1>
        <StartNewChat/>
         
        
          
        <Paper sx={{ 
          flex: 2,
          padding: 2,
          overflowY: 'auto',
          maxWidth: '179vh',
          // opacity:'00%'
          
          
             }}>
          {session ? (
            <>
              <List >
                {session.conversation.map((convo, index) => (
                  <ListItem key={index}>
                    <DisplayMessage messageProp={convo}  />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <div>Session not found</div>
          )}
        </Paper>
        <Box
          sx={{ padding: 2 }}
          onMouseEnter={handleMouseEnter}>
          <ChatInput onSendMessage={handleSendMessage} />
        
           
        </Box>
      </Typography>
    </div>
  );
};


export default DisplayChat;
