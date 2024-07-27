import { Box } from '@mui/material'
import React from 'react'
import theme from '../context/theme'
const Greeting = () => {
  
  let message:string
  message = "greetings adventurer"
  return (
    <Box component="section" sx={{ 
      p: 2,
      border: '1px dashed grey',
      bgcolor:'#3492ca'
    }}>
    {message}
  </Box>
  )
}

export default Greeting