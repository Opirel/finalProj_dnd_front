import React from 'react';

import { Message } from '../context/types'; // Assume types are defined here
import Chat_bot from './Chat_bot';
import Chat_user from './Chat_user';
import { Box } from '@mui/material';
import { Opacity } from '@mui/icons-material';


// parent component to display the messages from the user and the bot and holds the messages components

type Props = {
    messageProp : Message
};

export const DisplayMessage: React.FC<Props> = ({ messageProp }) => {
    const { message , sender } = messageProp 

    return (
        
        <Box display={"inline-block"} 
        sx={{
            // whiteSpace:'norwap',
            opacity:'100%',
            // backgroundcolor:"pink",
        }}
       
          >
        {sender === "user" ? (
            <Chat_user message={message} />
        ) : (
            <Chat_bot message={message} />
        )}
        
    </Box>
    );
 
};
