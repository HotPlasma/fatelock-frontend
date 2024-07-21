import { useRef, useEffect } from 'react';
import './styles/App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import Profile from './components/Profile.tsx';
import ToolsComponent from './components/ToolsComponent.tsx';
import JobsComponent from './components/JobsComponent.tsx';
import AboutMe from './components/AboutMeComponent.tsx';
import Link from '@mui/material/Link';
import { Typography, Divider, useMediaQuery, useTheme } from '@mui/material';
import AnimatedCursor from "react-animated-cursor";

function App() {
  const toolsRef = useRef(null);
  const jobsRef = useRef(null);
  const aboutRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.href = `https://${window.location.hostname}${window.location.pathname}`;
    }
  }, []);

  return (
    <>
      <div>
        <ResponsiveAppBar toolsRef={toolsRef} jobsRef={jobsRef} aboutRef={aboutRef} />
      </div>
      <Profile projectsRef={jobsRef} />
      <Divider sx={{ my: 3, bgcolor: 'white', height: '1px' }} />
      <ToolsComponent ref={toolsRef} />
      <Divider sx={{ my: 3, bgcolor: 'white', height: '1px' }} />
      <JobsComponent ref={jobsRef} />
      <Divider sx={{ my: 3, bgcolor: 'white', height: '1px' }} />
      <AboutMe ref={aboutRef} />
      <Divider sx={{ my: 3, bgcolor: 'white', height: '1px' }} />

      <div>
        <Copyright />
      </div>
      {!isMobile && (
        <AnimatedCursor
          showSystemCursor={true}
          trailingSpeed={12}
          innerSize={0}
          outerSize={20}
          outerScale={2}
          outerAlpha={0}
          outerStyle={{
            border: '3px solid var(--cursor-color)'
          }}
        />
      )}
    </>
  )
}

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
    >
      {'Copyright © '}
      <Link color="inherit" href="https://fatelock.com">
        FateLock Consulting
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default App;
