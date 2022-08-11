import { Box } from '@mui/material'
import React from 'react'
import SearchFooter from './Home/SearchFooter'
import SearchHeader from './Home/SearchHeader'
import styles from "../styles/Home.module.css";
import { useEffect } from 'react';


export default function Layout({ children, home }) {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    }}>
      <div className={styles.container}>
        <SearchHeader />
        {children}
        <SearchFooter />
      </div>
    </Box>
  )
}


