import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22c55e", // Verde principal
      light: "#4ade80",
      dark: "#16a34a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#10b981", // Verde secundário
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    background: {
      default: "#1a1a1a", // Preto puro
      paper: "#111111", // Preto mais claro para cards
    },
    text: {
      primary: "#ffffff",
      secondary: "#a3a3a3",
    },
    divider: "#333333",
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#3b82f6",
    },
    success: {
      main: "#22c55e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h5: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontWeight: 500,
      color: "#ffffff",
    },
    body1: {
      color: "#ffffff",
    },
    body2: {
      color: "#a3a3a3",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #333333",
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#333333",
            },
            "&:hover fieldset": {
              borderColor: "#22c55e",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#22c55e",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#333333",
        },
        head: {
          backgroundColor: "#1a1a1a",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
})
