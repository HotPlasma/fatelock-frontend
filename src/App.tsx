import './styles/App.css'
import logo from './assets/images/logo.png';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AnimatedCursor from "react-animated-cursor"


function App() {

  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <img src={logo} className="logo" alt="FateLock Logo" />
      </div>
      <h1>Work in Progress</h1>
      <div className="card">
        <p>
          This page is currently under construction. Check back soon for updates!
        </p>


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
