import { Box, Switch, Typography } from '@mui/material'
import React from 'react'

export default function SearchHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '466px',
        height: '84px',
        padding: '32px 16px 16px 16px',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{
        fontSize: '26px',
        lineHeight: '36px',
        fontWeight: '700',
        fontFamily: 'Arsenal',
      }}>Search</Typography>
      <Switch sx={{

      }} />

    </Box>
  )
}
