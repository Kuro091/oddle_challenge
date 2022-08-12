import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername } from '../../store/searchSlice';
import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RepoCard from '../../components/Home/RepoCard';
import Layout_TwoColumnCardDisplay from '../../components/Layout_TwoColumnCardDisplay';
import UserCard from '../../components/Home/UserCard';
import { selectLiked } from '../../store/authSlice';
import Spinner from '../../components/Spinner';

export default function UserDetail() {
  const router = useRouter()
  const { username } = router.query
  const dispatch = useDispatch()
  const user = useSelector((state) => state.search.user)
  const pending = useSelector((state) => state.search.pending)
  //console.log('user is ', user);

  const [value, setValue] = useState(0);
  const likedUsers = useSelector(selectLiked);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [username, dispatch]);
  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 10px 10px', minHeight: '100vh', paddingBottom: '200px' }}>
        {pending && (<> <Spinner /></>)}

        {!pending &&
          user && (
            <>
              <Image style={{ flexGrow: 0, borderRadius: '160px' }} src={user.avatar_url} width={200} height={200} alt='avatar' />
              <div style={{ textAlign: 'center', width: '200px', marginTop: '10px', color: theme.palette.text.primary }}>
                <div style={{ fontFamily: 'Arsenal', fontSize: '26px', marginBottom: '3px' }}>{user.name}</div>
                <div style={{ fontFamily: 'Jost', fontSize: '22px' }}>{user.login}</div>
                <div style={{ fontFamily: 'Jost', display: 'inline-flex', alignContent: 'center' }}><LocationCityIcon sx={{ width: '16px', height: '16px', color: 'rgba(0, 0, 0, 0.54)' }} />{user.location}</div>
              </div>
              {/* TABs */}
              <Box sx={{ width: '100%', marginTop: '10px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ flexGrow: 1 }} label={`Repository (${user.public_repos})`} />
                    <Tab sx={{ flexGrow: 1 }} label={`Followers (${user.followers})`} />
                    <Tab sx={{ flexGrow: 1 }} label={`Following (${user.following})`} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Layout_TwoColumnCardDisplay>
                    {user?.repositoriesList?.map((repo) => (
                      <RepoCard repo={repo} key={repo.name} />
                    ))}
                  </Layout_TwoColumnCardDisplay>


                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Layout_TwoColumnCardDisplay>
                    {user?.followersList?.map((follower) => (
                      <UserCard user={follower} key={follower.login} likedUsers={likedUsers} />
                    ))}
                  </Layout_TwoColumnCardDisplay>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Layout_TwoColumnCardDisplay>
                    {user?.followingList?.map((following) => (
                      <UserCard user={following} key={following.login} likedUsers={likedUsers} />
                    ))}
                  </Layout_TwoColumnCardDisplay>

                </TabPanel>
              </Box>

            </>

          )}
      </Box>

    </Layout >
  )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
