import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '../store/authSlice';
import { wrapper } from '../store/store';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>
      {/* <Switch {...label} defaultChecked /> */}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      //await store.dispatch(setAuthState(false));
      console.log("State on server", store.getState());
      return {
        props: {
          authState: false,
        },
      };
    }
);