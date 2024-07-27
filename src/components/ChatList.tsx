import React from 'react';
import { useSessions } from '../context/allContext';
import { Session } from '../context/types';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';


interface ChatListProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ isOpen, toggleSidebar }) => {
    const { sessions } = useSessions();
    const waga= 2
    // Debug log to check the sessions data
    console.log('Sessions from chatlist:', sessions);
    // console.log(waga);
    
   
    

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleSidebar}
            variant="persistent"
            sx={{ 
                width: isOpen ? 240 : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: isOpen ? 240 : 0, boxSizing: 'border-box' },
                
         }}
        >
            <div style={{ padding: 16 }}>
                <h1>Sessions</h1>
            </div>
            <List>
                {sessions.length > 0 ? sessions.map((session: Session) => (
                    <ListItem  key={session.sessionID}>
                        <ListItemText primary={waga} />
                    </ListItem>
                )) : (
                    <ListItem>
                        <ListItemText primary="No sessions available" />
                    </ListItem>
                )}
            </List>
        </Drawer>
        
    );
};

export default ChatList;
