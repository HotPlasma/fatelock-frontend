import './styles/App.css'
// import logo from './assets/images/logo.png';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import Profile from './components/Profile.tsx';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import AnimatedCursor from "react-animated-cursor"


function App() {

  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <Profile />
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
      <Link color="inherit" href="http://fatelock.com">
        FateLock Consulting
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default App
