import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatInput from './components/ChatInput'; // Ensure this import path is correct
import ChatList from './components/ChatList';
import DisplayChat from './components/DisplayChat';
import Greeting from './components/Greeting';
import { SessionProvider } from './context/allContext'; // Ensure the context is properly set up
import { Box, Fab, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomePage from './components/HomePage';
// import CssBaseline from '@mui/material/CssBaseline';
import theme from './context/theme'
import BGImage from './assets/dark_winged_mage_and_fighter_arial_battle.png'
import About from './components/About';




function App() {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSendMessage = (message:string) => {
    console.log("Message sent from app:", message);
    // Implement your message sending logic here
  };
   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
 

  return (
    <Box 
    sx={{
      // backgroundImage: `url(${BGImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
      }}
      //  backgroundImage: 'C:/Users\user\Desktop\python course\final project-dnd character creator\project\front\src\assets\dark winged mage and fighter arial battle.jpeg'}}
   >
   
    <SessionProvider>
    
      <Greeting />
      <BrowserRouter>
        <Routes>
          <Route path="/sessions/:sessionid" element={<DisplayChat />} />
          <Route path="/" element={<HomePage/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
      {/* <ChatInput onSendMessage={handleSendMessage} /> */}
      <Fab 
        color="secondary" 
        aria-label="toggle drawer" 
        onClick={toggleSidebar}
        style={{ position: 'fixed', top: 4,
           right: 10,
          fontSize:'small'
         }}
      >
        <MenuIcon/>
      </Fab>

       
       <ChatList isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </SessionProvider>
    
    </Box>
  );
 
}

export default App;
