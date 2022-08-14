import { Box, Grid } from '@mui/material'
import React from 'react'

export default function Layout_TwoColumnCardDisplay({ children }) {
  return (
    <Grid sx={{ display: 'flex', position: 'relative', left: '6px', padding: '10px', alignContent: 'center', justifyContent: 'center' }} container spacing={2}>
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
