import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

// displays the messages from the bot
type Props = {
  message: string
}
const Chat_bot: React.FC<Props> = ({ message }) => {
  const [botMessages, setbotMessages] = useState([]);
  

  return (
    <Typography sx={{
      // whiteSpace:'normal',
      whiteSpace:'norwap',
      display:"flex",
      backgroundColor: "navy",
      color: 'white',
      maxWidth: '80vw',
      my: 6,
      py: 1,
      px: 1 ,

    }}  >
      {message}
    </Typography>

  );
};

export default Chat_bot;
