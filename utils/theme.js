import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
    // primary: {
    //   main: "#fcba03",
    // },
  },
});