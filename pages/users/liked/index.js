import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../../components/Home/UserCard';
import Layout from '../../../components/layout';
import Layout_TwoColumnCardDisplay from '../../../components/Layout_TwoColumnCardDisplay';
import Spinner from '../../../components/Spinner';
import { getUsersByUsername, setAuthPending } from '../../../store/authSlice';
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';

export default function Liked() {
  const likedUsersArr = useSelector((state) => state.auth.liked);
  const likedUsers = useSelector((state) => state.auth.searchResult?.items);
  const authPending = useSelector((state) => state.auth.pending);
  const dispatch = useDispatch();
  useEffect(() => {
    if (likedUsersArr) {
      dispatch(getUsersByUsername(likedUsersArr));
    }
  }, [dispatch, likedUsersArr])
  return (
    <Layout>
      <div style={{ paddingBottom: '200px' }}>
        {authPending && (<Spinner />)}
        {likedUsers && likedUsers.length > 0 &&
          <Layout_TwoColumnCardDisplay>
            {likedUsers.map((user) => (
              <UserCard key={user.login} user={user} likedUsers={likedUsersArr} />
            ))}
          </Layout_TwoColumnCardDisplay>
        }
        {likedUsers && likedUsers.length === 0 &&
          <div style={{ display: 'flex', position: 'relative', top: '35%', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <GroupIcon />
              <Typography sx={{
                fontFamily: 'Jost',
                fontSize: '14px',
                flexBasis: '100%'
              }}>
                {`Once you like people, you'll see them here.`}
              </Typography>

            </div>
          </div>
        }

      </div>
    </Layout>
  )
}
