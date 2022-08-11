import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layout';
import { setCurrentTab } from '../../../store/appSlice';

export default function Liked() {
  const likedUsers = useSelector((state) => state.auth.liked);
  console.log(likedUsers)
  return (
    <Layout>
      {likedUsers && likedUsers.length > 0 ? (likedUsers.map(user => (
        <div key={user}>
          <h2>{user}</h2>
        </div>

      ))) : (
        <div>havent liked</div>
      )}
    </Layout>
  )
}
