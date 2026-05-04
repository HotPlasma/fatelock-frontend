import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import LogoIcon from '../assets/images/logo.png';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type NavKey = 'home' | 'skills' | 'portfolio' | 'about';

const navItems: { key: NavKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'skills', label: 'Skills' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'about', label: 'About' },
];

interface ResponsiveAppBarProps {
  toolsRef: React.RefObject<HTMLDivElement>;
  jobsRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const SCROLL_OFFSET = 80;

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ toolsRef, jobsRef, aboutRef }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToRef = (r: React.RefObject<HTMLDivElement>) => {
    if (r.current) {
      window.scrollTo({
        top: r.current.offsetTop - SCROLL_OFFSET,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const go = (key: NavKey) => {
    handleCloseNavMenu();
    switch (key) {
      case 'home':
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        break;
      case 'skills':
        scrollToRef(toolsRef);
        break;
      case 'portfolio':
        scrollToRef(jobsRef);
        break;
      case 'about':
        scrollToRef(aboutRef);
        break;
      default:
        break;
    }
  };

  const appBarVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.45,
        ease: 'easeOut' as const,
        staggerChildren: reducedMotion ? 0 : 0.06,
        delayChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={appBarVariants}>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          top: 0,
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: scrolled ? 'rgba(10, 10, 15, 0.82)' : 'rgba(10, 10, 15, 0.55)',
          transition: 'background-color 0.25s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 1.5, sm: 2 }, gap: 1, color: 'text.primary' }}>
          <motion.div variants={itemVariants}>
            <Box
              component="img"
              src={LogoIcon}
              alt="FateLock"
              className="logo"
              sx={{ display: { xs: 'none', md: 'block' }, height: 40, width: 'auto', mr: 1, opacity: 0.9 }}
            />
          </motion.div>

          <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="subtitle1"
                component="button"
                type="button"
                onClick={() => go('home')}
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'text.primary',
                  textDecoration: 'none',
                  lineHeight: 1.2,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  p: 0,
                  textAlign: 'left',
                }}
              >
                FateLock Consulting
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <motion.div key={item.key} variants={itemVariants}>
                <Button color="inherit" onClick={() => go(item.key)} sx={{ color: 'text.primary', px: 1.25 }}>
                  {item.label}
                </Button>
              </motion.div>
            ))}
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/egorkha/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: 'primary.light', ml: 0.5 }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/egorkha/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              size="large"
              sx={{ color: 'primary.light' }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
            >
              {navItems.map((item) => (
                <MenuItem key={item.key} onClick={() => go(item.key)}>
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default ResponsiveAppBar;
