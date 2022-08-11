import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '../store/authSlice';
import { wrapper } from '../store/store';
import { octokit } from '../utils/octokitHelper';
import { Box } from '@mui/material';
import SearchHeader from '../components/Home/SearchHeader';
import SearchMain from '../components/Home/SearchMain';
import SearchFooter from '../components/Home/SearchFooter';

export default function Home({ users }) {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
      <Box gridColumn="span 4"></Box>
      <Box gridColumn="span 4" sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className={styles.container}>
          <SearchHeader />
          <SearchMain />
          <SearchFooter />
        </div>
      </Box>
      <Box gridColumn="span 4"></Box>
    </Box>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      //await store.dispatch(setAuthState(false));
      //console.log("State on server", store.getState());
      const { auth: { authState } } = store.getState();

      //console.log('authState :', authState)
      // const {
      //   data: { login },
      // } = await octokit.rest.users.getAuthenticated();

      return {
        props: {
          authState: authState,
          //users: login
        },
      };
    }
);