import { createTheme } from "@mui/material/styles";



export const themeLight = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#fff"
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "darkgrey"
          }
        },
        colorSecondary: {
          color: 'red'
        },

        track: {
          // Controls default (unchecked) color for the track
          backgroundColor: "darkgrey",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            backgroundColor: "grey"
          }
        }
      }
    }
  },
  palette: {
    type: 'light',
    background: {
      default: '#757575',
    },
    text: {
      primary: '#1c1c1c'
    },
    custom: {
      innerBackground: '#fff',
      innerCardBackground: '#fff',
      heartIcon: '#F44336'
    }
  },
});

export const themeDark = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#fff"
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "darkgrey"
          }
        },
        colorSecondary: {
          color: 'red'
        },

        track: {
          // Controls default (unchecked) color for the track
          backgroundColor: "#fff",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            backgroundColor: "#fff"
          }
        }
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
    background: {
      default: "#212121",
    },
    text: {
      primary: '#fff'
    },
    custom: {
      innerBackground: '#757575',
      innerCardBackground: '#403f3f',
      heartIcon: '#FFF'
    }
  },
});