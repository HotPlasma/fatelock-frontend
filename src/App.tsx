import { useRef } from 'react';
import './styles/App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import Profile from './components/Profile.tsx';
import ToolsComponent from './components/ToolsComponent.tsx';
import Link from '@mui/material/Link';
import { Typography, Divider } from '@mui/material';
import AnimatedCursor from "react-animated-cursor";

function App() {
  const toolsRef = useRef(null);

  return (
    <>
      <div>
        <ResponsiveAppBar toolsRef={toolsRef} />
      </div>
      <Profile />
      <Divider sx={{ my: 4, color: 'white' }} />
      <ToolsComponent ref={toolsRef} />
      <div>
        <Copyright />
      </div>
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
