import { Box, useTheme } from '@mui/material'
import React from 'react'
import SearchFooter from './Home/SearchFooter'
import SearchHeader from './Home/SearchHeader'
import { useEffect } from 'react';

export default function Layout({ children, home }) {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: theme.palette.background.default,
    }}>
      <div style={{
        width: '466px',
        height: '100%',
        color: 'black',
        backgroundColor: theme.palette.custom.innerBackground,
      }}>
        <SearchHeader />
        {children}

        <SearchFooter />
      </div>
    </Box>
  )
}


