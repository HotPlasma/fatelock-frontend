import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoIcon from '../assets/images/logo.png';
import EgorIcon from '../assets/images/sunglasses.jpg';

const pages = ['Home', 'Experience', 'Projects', 'About'];

function ResponsiveAppBar() {
  return (
    <AppBar position="fixed" sx={{ width: '100%', top: 0, bgcolor: '#242424' }}>
      <Toolbar>
        <Box
          component="img"
          src={LogoIcon}
          className="logo"
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, maxHeight: 75 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          FateLock Consulting
        </Typography>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          FateLock Consulting
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Egor Kharlamov" src={EgorIcon} sx={{ width: 85, height: 85 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
