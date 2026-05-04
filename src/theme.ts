import { createTheme } from '@mui/material/styles';

const bgDefault = '#0a0a0f';
const bgPaper = '#12121a';
const borderSubtle = 'rgba(255, 255, 255, 0.06)';
const accentFrom = '#8b5cf6';
const accentTo = '#06b6d4';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: bgDefault,
      paper: bgPaper,
    },
    primary: {
      main: '#a78bfa',
      light: '#c4b5fd',
      dark: '#7c3aed',
      contrastText: '#0a0a0f',
    },
    secondary: {
      main: '#22d3ee',
      contrastText: '#0a0a0f',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.92)',
      secondary: 'rgba(255, 255, 255, 0.65)',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Syne", "Inter", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: bgDefault,
          color: 'rgba(255, 255, 255, 0.92)',
        },
        '#root': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          paddingInline: 20,
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
          color: '#fff',
          '&:hover': {
            background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
            filter: 'brightness(1.08)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(167, 139, 250, 0.45)',
          '&:hover': {
            borderColor: accentFrom,
            backgroundColor: 'rgba(167, 139, 250, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: bgPaper,
          border: `1px solid ${borderSubtle}`,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 15, 0.65)',
          backdropFilter: 'saturate(140%) blur(14px)',
          WebkitBackdropFilter: 'saturate(140%) blur(14px)',
          borderBottom: `1px solid ${borderSubtle}`,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#c4b5fd',
          '&:hover': {
            color: '#e9d5ff',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});
