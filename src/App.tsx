import { useRef, useEffect } from 'react';
import './styles/App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import Profile from './components/Profile.tsx';
import ToolsComponent from './components/ToolsComponent.tsx';
import JobsComponent from './components/JobsComponent.tsx';
import AboutMe from './components/AboutMeComponent.tsx';
import Link from '@mui/material/Link';
import { Typography, Box, Container, Divider, useMediaQuery, useTheme } from '@mui/material';
import AnimatedCursor from 'react-animated-cursor';

function App() {
  const toolsRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.href = `https://${window.location.hostname}${window.location.pathname}`;
    }
  }, []);

  return (
    <>
      <ResponsiveAppBar toolsRef={toolsRef} jobsRef={jobsRef} aboutRef={aboutRef} />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          pt: { xs: 10, sm: 11 },
          pb: 6,
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Profile projectsRef={jobsRef} />
          <Divider sx={{ my: { xs: 4, md: 6 } }} />
          <ToolsComponent ref={toolsRef} />
          <Divider sx={{ my: { xs: 4, md: 6 } }} />
          <JobsComponent ref={jobsRef} />
          <Divider sx={{ my: { xs: 4, md: 6 } }} />
          <AboutMe ref={aboutRef} />
          <Divider sx={{ my: { xs: 4, md: 6 } }} />
          <Copyright />
        </Container>
      </Box>
      {!isMobile && (
        <AnimatedCursor
          showSystemCursor={true}
          trailingSpeed={12}
          innerSize={0}
          outerSize={20}
          outerScale={2}
          outerAlpha={0}
          outerStyle={{
            border: '3px solid var(--cursor-color)',
          }}
        />
      )}
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" align="center" color="text.secondary" component="footer" sx={{ py: 2 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://fatelock.com" underline="hover">
        FateLock Consulting
      </Link>
      {' · '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default App;
