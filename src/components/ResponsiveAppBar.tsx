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
import { motion } from 'framer-motion';
import LogoIcon from '../assets/images/logo.png';
import EgorIcon from '../assets/images/sunglasses.jpg';

const pages = ['Profile', 'My Skillset', 'Professional Experience', 'About'];

interface ResponsiveAppBarProps {
  toolsRef: React.RefObject<HTMLDivElement>;
  jobsRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ toolsRef, jobsRef, aboutRef }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const ScrollOffset = 80; // Adjust as necessary for your AppBar height

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - ScrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleCloseNavMenu();
  };

  const handleExperienceClick = () => {
    scrollToRef(toolsRef);
    handleCloseNavMenu();
  };

  const handleProjectsClick = () => {
    scrollToRef(jobsRef);
    handleCloseNavMenu();
  };

  const handleAboutClick = () => {
    scrollToRef(aboutRef);
    handleCloseNavMenu();
  };

  // Animation variants for the app bar
  const appBarVariants = {
    hidden: { 
      opacity: 0, 
      y: -80
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={appBarVariants}
    >
      <AppBar position="fixed" sx={{ width: '100%', top: 0, bgcolor: '#242424', zIndex: 1 }}>
        <Toolbar>
          <motion.div variants={itemVariants}>
            <Box
              component="img"
              src={LogoIcon}
              className="logo"
              sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, maxHeight: { xs: 50, md: 75 } }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <motion.div variants={itemVariants}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
            </motion.div>
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
                      case 'About':
                        handleAboutClick();
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

          <motion.div variants={itemVariants}>
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
              FateLock Consulting
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: { md: 'flex-end', lg: 'left' } }}>
            {pages.map((page, index) => (
              <motion.div key={page} variants={itemVariants} custom={index}>
                <Button
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
                      case 'About':
                        handleAboutClick();
                        break;
                      default:
                        handleCloseNavMenu();
                    }
                  }}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
                >
                  {page}
                </Button>
              </motion.div>
            ))}
          </Box>

          <motion.div variants={itemVariants}>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Egor Kharlamov" src={EgorIcon} sx={{ width: { xs: 40, md: 85 }, height: { xs: 40, md: 85 } }} />
              </IconButton>
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default ResponsiveAppBar;
