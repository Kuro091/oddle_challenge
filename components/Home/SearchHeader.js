import { Box, Switch, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

export default function SearchHeader({ home }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '466px',
        height: '84px',
        padding: '32px 16px 16px 16px',
        justifyContent: 'space-between',
        zIndex: '99'
      }}
    >
      {router.pathname == '/' && <Typography sx={{
        fontSize: '26px',
        lineHeight: '36px',
        fontWeight: '700',
        fontFamily: 'Arsenal',
      }}>Search</Typography>}

      {router.pathname != '/' && <HomeIcon onClick={() => { router.push('/') }} sx={{ width: '36px', height: '36px', color: 'rgba(0, 0, 0, 0.87)', cursor: 'pointer' }} />}
      <Switch sx={{

      }} />

    </Box>
  )
}
