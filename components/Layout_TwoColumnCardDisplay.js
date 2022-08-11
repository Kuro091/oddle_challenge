import { Box, Grid } from '@mui/material'
import React from 'react'

export default function Layout_TwoColumnCardDisplay({ children }) {
  return (
    <Grid sx={{ position: 'relative', left: '16px', padding: '10px' }} container spacing={2}>
      <Box
        sx={{
          marginTop: '16px',
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2
        }}
      >
        {children}
      </Box>
    </Grid>
  )
}
