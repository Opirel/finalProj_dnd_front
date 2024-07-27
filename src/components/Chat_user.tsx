import React from 'react';
import "../styles/chat_user.module.css"
import { Box } from '@mui/material';

// import { v4 as uuidv4 } from 'uuid';

// displays the messages from the user

type Props = {
  message: string
}
const Chat_user: React.FC<Props>  = ({message}) => {

  return (
    <div>
    <Box sx={{ 
      backgroundColor: "green",
      // padding: '10px',
      margin: '19px',
      marginLeft:'70vw' ,
      color: 'white',
      maxWidth: '40vw',
      display:'block',
      opacity:"100%"
      }}  > 
    {message}
   
    </Box>
    </div>
  );
};

export default Chat_user;
