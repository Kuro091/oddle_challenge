import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { themeLight, themeDark } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { store, wrapper } from "../store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { useStore, useSelector } from 'react-redux';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const store = useStore((state) => state);
  const currentTheme = useSelector((state) => state.auth.currentTheme);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={currentTheme === 'light' ? themeLight : themeDark}>
        <PersistGate persistor={store.__persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </ThemeProvider>
    </CacheProvider>
  )

}


export default wrapper.withRedux(MyApp)