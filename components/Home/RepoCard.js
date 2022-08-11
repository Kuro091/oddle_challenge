import { Grid, Paper } from '@mui/material';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setLiked } from '../../store/authSlice';

export default function RepoCard({ repo }) {
  const router = useRouter();
  const dispatch = useDispatch();


  return (
    <Paper sx={{
      width: '209px',
      height: '80px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    }} variant="outlined">
      <Grid container>
        <Grid item xs={12} style={{ position: 'relative' }}>
          <div style={{ marginLeft: '6px', position: 'relative', float: 'left', marginTop: '3px', textAlign: 'left', }}>
            <div style={{
              fontSize: '16px',
              width: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}><b>{repo.name}</b></div>
            <div style={{ fontSize: '12px', marginTop: '10px' }}>
              <div>
                {repo.stargazers_count} stars
              </div>
              <div>
                {repo.forks} forks
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

    </Paper>
  )
}
