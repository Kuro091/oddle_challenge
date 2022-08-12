import { BottomNavigation, BottomNavigationAction, Box, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function SearchFooter() {
  const router = useRouter();
  const mapper = useMemo(() => {
    return [
      { value: 0, label: 'Users', route: '/' },
      { value: 1, label: 'Liked', route: '/users/liked' },
    ];
  }, []);
  const theme = useTheme();
  const [value, setValue] = useState(mapper.find(m => m.route == router.pathname)?.value || 0);
  return (
    <Box sx={{
      position: 'fixed',
      bottom: '0',
      width: '466px',
      height: '72px',
      background: theme.palette.background.default,
      boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)',
      zIndex: '99'
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(mapper[newValue].route);
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          fontFamily: 'Roboto',
          height: '100%',
          backgroundColor: theme.palette.custom.innerBackground,
        }}
      >
        <BottomNavigationAction sx={{ height: '100%' }} label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction sx={{ height: '100%' }} label="Favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>

    </Box>
  )
}
