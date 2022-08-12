import { Grid, Paper, useTheme } from '@mui/material';
import Image from 'next/image';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthPending, setAuthSearchResult, setLiked } from '../../store/authSlice';
import { wrapper } from '../../store/store';

export default function UserCard({ user, likedUsers }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLiked = likedUsers?.includes(user.login);
  const searchField = useSelector((state) => state.search.searchQuery);
  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(setAuthPending(true))
    if (isLiked) {
      dispatch(setLiked(likedUsers.filter((login) => login !== user.login)));
      return;
    }
    dispatch(setLiked([...likedUsers, user.login]));
  }

  const handleRouteToDetails = (e, username) => {
    e.stopPropagation();
    router.push(`/users/${username}`);
  }

  const theme = useTheme();

  return (
    <Paper sx={{
      width: '209px',
      height: '80px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
      padding: '2px',
      cursor: 'pointer',
      backgroundColor: theme.palette.custom.innerCardBackground
    }} variant="outlined" key={user.id} onClick={(e) => handleRouteToDetails(e, user.login)}>
      <Grid container>
        <Grid item xs={4}>
          <div style={{ marginTop: '4px', height: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <Image width={64} height={64} src={user.avatar_url} alt={user.login} />
          </div>
        </Grid>
        <Grid item xs={8} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0px', right: '1px', zIndex: '1' }} onClick={(e) => handleLike(e)}>{isLiked ? <FavoriteOutlinedIcon sx={{ color: theme.palette.custom.heartIcon }} /> : <FavoriteBorderOutlinedIcon sx={{ color: theme.palette.custom.heartIcon }} />}</div>
          <div style={{ marginLeft: '6px', position: 'relative', float: 'left', marginTop: '3px', textAlign: 'left', }}>
            <div style={{
              fontSize: '16px',
              width: '80px',
              height: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}><b>{searchField}</b>{user.login.split(searchField)}</div>
            <div style={{ fontSize: '12px', marginTop: '10px' }}>
              <div>
                {user.followers && (<>{user.followers} followers</>)}
                {!user.followers && (<>0 followers</>)}
              </div>
              <div>
                {user.following && (<>{user.followers} following</>)}
                {!user.following && (<> following</>)}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

    </Paper>
  )
}
