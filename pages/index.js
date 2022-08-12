import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, selectLiked, setAuthState } from '../store/authSlice';
import { wrapper } from '../store/store';
import { octokit } from '../utils/octokitHelper';
import Layout from '../components/layout';
import { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Pagination, Paper, TextField, Typography } from '@mui/material';
import _debounce from 'lodash/debounce';
import SearchIcon from '@mui/icons-material/Search';
import Layout_TwoColumnCardDisplay from '../components/Layout_TwoColumnCardDisplay';
import UserCard from '../components/Home/UserCard';
import Spinner from '../components/Spinner';
import { getUsersByQuery, selectSearchState, setSearchQuery } from '../store/searchSlice';

export default function Home() {
  const search = useSelector(selectSearchState);
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState(search?.searchQuery || '');
  const likedUsers = useSelector(selectLiked);

  const handleChange = (e) => {
    setSearchField(e.target.value);
    debounceFn(e.target.value);
  };

  const debounceFn = useCallback(_debounce(handleGetUsers, 500), []);

  function handleGetUsers(txt) {
    dispatch(setSearchQuery(txt));
    dispatch(getUsersByQuery({ searchQuery: txt, per_page: 12, page: 1 }));
  }

  const handleSwitchPage = (e) => {
    const page = parseInt(e.target.innerText);
    dispatch(getUsersByQuery({ searchQuery: searchField, per_page: 12, page }));
  }

  return (
    <Layout home>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', textAlign: 'center', paddingBottom: '72px', height: 'fit-content', backgroundColor: 'white' }}>
        <div>
          <TextField value={searchField}
            onChange={handleChange}
            sx={{
              width: '434px',
              height: '56px',
            }} id="search" placeholder="Enter GitHub username, i.e. gaearon" variant="outlined" />


          {/* LOADING */}
          {searchField != '' && search?.pending && <Spinner />}

          {/* NOT FOUND */}
          {search?.searchResult.items.length === 0 && searchField && (<Box sx={{ position: 'relative', top: '300px' }}>
            <SearchIcon width={36} height={36} sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            <Typography sx={{
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              fontFamily: 'Jost'
            }}>No search result found for <br /><b>{searchField}
              </b></Typography>
          </Box>)}


          {/* FOUND */}
          {search?.pending != true && searchField != "" && search?.searchResult && search?.searchResult.items.length > 0 && <>
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
            <div style={{ marginLeft: '6px' }}>
              <Layout_TwoColumnCardDisplay>
                {search.searchResult.items.map((user) => (
                  <UserCard key={user.id} user={user} likedUsers={likedUsers} />
                ))}
              </Layout_TwoColumnCardDisplay>


              {search.currentPage > 0 && <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <Pagination defaultPage={search.currentPage - 1} count={search.maxPage} onChange={(e) => handleSwitchPage(e)} />

              </Box>}
            </div>


          </>}


          {/* DEFAULT  */}
          {searchField == '' && (
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
          )

          }
        </div>

      </Box >
    </Layout>
  );
}


