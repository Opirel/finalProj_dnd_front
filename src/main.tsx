
import ReactDOM from 'react-dom';
import App from './App';
import { SessionProvider } from './context/allContext';
import  theme  from './context/theme'
import { ThemeProvider } from '@mui/material';

ReactDOM.render(
    
        <SessionProvider>
            <App />
        </SessionProvider>
   ,
    document.getElementById('root')
);