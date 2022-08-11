import { Grid, Paper } from '@mui/material';
import Image from 'next/image';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLiked } from '../../store/authSlice';

export default function UserCard({ user, likedUsers, searchField }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLiked = likedUsers?.includes(user.login);

  const handleLike = (e) => {
    e.stopPropagation();
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


  return (
    <Paper sx={{
      width: '209px',
      height: '80px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
      padding: '2px',
      cursor: 'pointer',
    }} variant="outlined" key={user.id} onClick={(e) => handleRouteToDetails(e, user.login)}>
      <Grid container>
        <Grid item xs={4}>
          <div style={{ marginTop: '4px', height: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <Image width={64} height={64} src={user.avatar_url} alt={user.login} />
          </div>
        </Grid>
        <Grid item xs={8} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0px', right: '1px', zIndex: '99' }} onClick={(e) => handleLike(e)}>{isLiked ? <FavoriteOutlinedIcon sx={{ color: '#F44336' }} /> : <FavoriteBorderOutlinedIcon sx={{ color: '#F44336' }} />}</div>
          <div style={{ marginLeft: '6px', position: 'relative', float: 'left', marginTop: '3px', textAlign: 'left', }}>
            <div style={{
              fontSize: '16px',
              width: '75px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}><b>{searchField}</b>{user.login.split(searchField)}</div>
            <div style={{ fontSize: '12px', marginTop: '10px' }}>
              <div>
                {user.followers} followers
              </div>
              <div>
                {user.following} following
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

    </Paper>
  )
}