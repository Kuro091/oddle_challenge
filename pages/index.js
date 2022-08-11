import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '../store/authSlice';
import { wrapper } from '../store/store';
import { octokit } from '../utils/octokitHelper';
import SearchMain from '../components/Home/SearchMain';
import Layout from '../components/layout';
import { useEffect } from 'react';

export default function Home() {
  return (
    <Layout home>
      <SearchMain />
    </Layout>
  );
}

