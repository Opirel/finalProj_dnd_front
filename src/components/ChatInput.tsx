import React, { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



type Props = {
    onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <form onSubmit={handleSubmit}
         style={{
             display: 'flex',
            marginTop: '5%',
            marginLeft: '55%',
            maxWidth: '294px',
            background:'gray',
            color:'white',
           }}>
            <TextField id="standard-basic" 
            label="Type your message here..." 
            variant='standard'
            color='warning'
                onChange={handleInputChange} value={message} />

            <Button variant="contained" type="submit" style={{ width: '100px' }}>Send</Button>
        </form>
    );
};



export default ChatInput;

