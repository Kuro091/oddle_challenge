import { Grid, Paper } from '@mui/material';
import Image from 'next/image';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


export default function UserCard({ user, searchField }) {

  const handleLike = () => {


  }

  return (
    <Paper sx={{
      width: '209px',
      height: '80px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
      padding: '2px',
    }} variant="outlined" key={user.id}>
      <Grid container>
        <Grid item xs={4}>
          <div style={{ marginTop: '4px', height: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <Image width={64} height={64} src={user.avatar_url} alt={user.login} />
          </div>
        </Grid>
        <Grid item xs={8} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0px', right: '1px' }} onClick={handleLike}><FavoriteBorderOutlinedIcon /></div>
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
