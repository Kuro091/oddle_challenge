import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import { getUsersByQuery, selectSearchState } from '../../store/searchSlice';
import UserCard from './UserCard';

export default function SearchMain() {
  const [searchField, setSearchField] = useState('');
  const dispatch = useDispatch();
  const search = useSelector(selectSearchState);

  const handleChange = (e) => {
    setSearchField(e.target.value);
    debounceFn(e.target.value);
  }

  const debounceFn = useCallback(_debounce(handleGetUsers, 500), []);

  function handleGetUsers(searchField) {
    dispatch(getUsersByQuery({ searchQuery: searchField, per_page: 12, page: 1 }));
  }

  console.log('search', search);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', textAlign: 'center', height: 'fit-content', backgroundColor: 'white' }}>
      <div>
        <TextField value={searchField}
          onChange={handleChange}
          sx={{
            width: '434px',
            height: '56px',
          }} id="search" placeholder="Enter GitHub username, i.e. gaearon" variant="outlined" />


        {search?.pending ? <div style={{ marginTop: '16px' }}>Loading...</div>
          :
          search?.searchResult && search?.searchResult.items.length > 0 ? (
            <>
              <div style={{
                top: '5px',
                left: '16px',
                marginBottom: '16px',
                position: 'relative',
                display: 'flex',
                fontSize: '14px',
                lineHeight: '20px'
              }}>
                {search.searchResult.total_count} Github users found
              </div>
              <Grid sx={{ position: 'relative', left: '16px' }} container spacing={2}>
                <Box
                  sx={{
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  {search.searchResult.items.map((user) => (
                    <UserCard key={user.id} user={user} searchField={searchField} />
                  ))}
                </Box>
              </Grid>


            </>

          ) : (
            <>

              <Box sx={{
                position: 'relative',
                width: '120px',
                height: '120px',
                left: '173px',
                top: '100px',
                background: 'url(GitHub-Mark-120px-plus.png)',
              }}></Box>
              <Box sx={{
                position: 'relative',
                width: '139px',
                height: '57px',
                top: '100px',
                left: '163px',
                background: 'url(GitHub_Logo.png)',
                backgroundRepeat: 'no-repeat',
              }}></Box>
              <Typography sx={{
                position: 'relative',
                width: '285px',
                height: '74px',
                left: '90px',
                top: '100px',

                fontFamily: 'Jost',
                fontSize: '14px',
                lineHeight: '20px',
                textAlign: 'center',

                color: 'rgba(0, 0, 0, 0.5)'


              }}>Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.</Typography>
            </>
          )}
      </div>

    </Box >
  )
}
