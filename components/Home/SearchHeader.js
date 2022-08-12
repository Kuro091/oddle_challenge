import { Box, Switch, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import { setCurrentTheme } from '../../store/authSlice';

export default function SearchHeader({ home }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentTheme = useSelector((state) => state.auth.currentTheme) === 'dark';

  const [toggleDark, setToggleDark] = useState(currentTheme || false);
  const theme = useTheme();

  const handleChange = (e) => {
    setToggleDark(e.target.checked);
    if (toggleDark) {
      dispatch(setCurrentTheme('light'))
    } else {
      dispatch(setCurrentTheme('dark'))
    }
  }
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
        color: theme.palette.text.primary
      }}>Search</Typography>}

      {router.pathname != '/' && <HomeIcon onClick={() => { router.push('/') }} sx={{ width: '36px', height: '36px', color: 'rgba(0, 0, 0, 0.87)', cursor: 'pointer' }} />}
      <Switch checked={toggleDark} onChange={handleChange} />

    </Box>
  )
}
