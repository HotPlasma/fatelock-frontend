import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoIcon from '../assets/images/logo.png';
import EgorIcon from '../assets/images/sunglasses.jpg';

const pages = ['Profile', 'My Skillset', 'Professional Experience', 'About'];

interface ResponsiveAppBarProps {
  toolsRef: React.RefObject<HTMLDivElement>;
  jobsRef: React.RefObject<HTMLDivElement>;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ toolsRef, jobsRef }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleCloseNavMenu();
  };

  const handleExperienceClick = () => {
    if (toolsRef.current) {
      toolsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  const handleProjectsClick = () => {
    if (jobsRef.current) {
      jobsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', top: 0, bgcolor: '#242424', zIndex: 1 }}>
      <Toolbar>
        <Box
          component="img"
          src={LogoIcon}
          className="logo"
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, maxHeight: { xs: 50, md: 75 } }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', sm: 'flex' },
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          FateLock Consulting
        </Typography>

        {/* Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  switch (page) {
                    case 'Profile':
                      handleHomeClick();
                      break;
                    case 'My Skillset':
                      handleExperienceClick();
                      break;
                    case 'Professional Experience':
                      handleProjectsClick();
                      break;
                    default:
                      handleCloseNavMenu();
                  }
                }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexGrow: 1,
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          FateLock
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => {
                switch (page) {
                  case 'Profile':
                    handleHomeClick();
                    break;
                  case 'My Skillset':
                    handleExperienceClick();
                    break;
                  case 'Professional Experience':
                    handleProjectsClick();
                    break;
                  default:
                    handleCloseNavMenu();
                }
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Egor Kharlamov" src={EgorIcon} sx={{ width: { xs: 40, md: 85 }, height: { xs: 40, md: 85 } }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
