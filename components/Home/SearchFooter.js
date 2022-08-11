import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchFooter() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{
      position: 'fixed',
      bottom: '0',
      width: '466px',
      height: '72px',
      background: '#FFFFFF',
      boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          fontFamily: 'Roboto',
          height: '100%'
        }}
      >
        <BottomNavigationAction sx={{ height: '100%' }} label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction sx={{ height: '100%' }} label="Favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>

    </Box>
  )
}
