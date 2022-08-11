import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout';
import { useDispatch } from 'react-redux';
import { getUserByUsername } from '../../store/searchSlice';
export default function UserDetail() {
  const router = useRouter()
  const { username } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserByUsername(username));

  }, [username]);
  return (
    <Layout tab={0}>
      <h1>User Detail: {username}</h1>
    </Layout>
  )
}
