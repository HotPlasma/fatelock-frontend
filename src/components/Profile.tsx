import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Container,
  Link,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import profileImage from '../assets/images/profile.jpg';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';

const valueProps = [
  {
    icon: CloudOutlinedIcon,
    title: 'DevOps & Infrastructure',
    description:
      "I'm very experienced in working with clients and stakeholders to identify their needs and translate requirements into cloud-based technical solutions, many of which are used by millions daily. I love automating away repetitive work and resolving critical issues causing blockers. It's very fulfilling. Even better lets discuss how to catch the problem early in future.",
  },
  {
    icon: LayersOutlinedIcon,
    title: 'Strong Fullstack Developer',
    description:
      "Problem solver first and foremost. I've fixed everything from android apps to windows servers to smart fridges. But don't just take my word for it. I may specalise in the cloud but that doesn't mean I can't make a react website or traceback an error in a language I'm unfamilar with.",
  },
  {
    icon: GroupsOutlinedIcon,
    title: 'Team Player',
    description:
      "I thrive in diverse technical environments — while I delegate effectively, I’m always ready to dive in personally when needed. Point me at a task and we’ll get it done. I will happily organise knowledge sharing sessions and train the team to avoid dependencies on myself. I'll also admit my weaknesses and ask questions when I don't know.",
  },
];

interface ProfileProps {
  projectsRef: React.RefObject<HTMLDivElement>;
}

const SCROLL_OFFSET = 80;

const Profile: React.FC<ProfileProps> = ({ projectsRef }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollDirection = useScrollDirection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const reducedMotion = usePrefersReducedMotion();

  const getInViewOptions = (threshold: number) => ({
    triggerOnce: false,
    threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
    rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px',
  });

  const { ref: heroTextRef, inView: heroTextInView } = useInView(getInViewOptions(0.15));
  const { ref: heroImageRef, inView: heroImageInView } = useInView(getInViewOptions(0.15));

  const [standOutEntered, setStandOutEntered] = useState(false);
  const [standOutAnimKey, setStandOutAnimKey] = useState(0);
  const standOutEnteredPrev = useRef(false);
  const { ref: standOutInViewRef, inView: standOutInView } = useInView({
    threshold: 0.08,
    rootMargin: '0px 0px -12% 0px',
    triggerOnce: false,
  });
  const standOutInViewLive = useRef(standOutInView);
  standOutInViewLive.current = standOutInView;

  useEffect(() => {
    if (standOutInView) setStandOutEntered(true);
  }, [standOutInView]);

  useEffect(() => {
    if (standOutEnteredPrev.current && !standOutEntered) {
      setStandOutAnimKey((k) => k + 1);
    }
    standOutEnteredPrev.current = standOutEntered;
  }, [standOutEntered]);

  useEffect(() => {
    const maybeUnloadStandOut = () => {
      if (standOutInViewLive.current) return;

      const home = document.getElementById('home');
      const stand = document.getElementById('differentiators');
      if (!home || !stand) return;

      const scrollY = window.scrollY;
      const standTop = stand.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const homeHeight = home.offsetHeight;
      const backAtHero =
        scrollY <= homeHeight * 0.34 && standTop > vh * 0.26;

      if (backAtHero) {
        setStandOutEntered(false);
      }
    };

    window.addEventListener('scroll', maybeUnloadStandOut, { passive: true });
    window.addEventListener('resize', maybeUnloadStandOut);
    maybeUnloadStandOut();
    return () => {
      window.removeEventListener('scroll', maybeUnloadStandOut);
      window.removeEventListener('resize', maybeUnloadStandOut);
    };
  }, []);

  const showScrollHint = !standOutInView;

  const scrollToStandOut = useCallback(() => {
    const el = document.getElementById('differentiators');
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [reducedMotion]);

  const setStandOutSectionRef = useCallback(
    (node: HTMLDivElement | null) => {
      standOutInViewRef(node);
    },
    [standOutInViewRef]
  );

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - SCROLL_OFFSET,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const ySmall = reducedMotion ? 0 : scrollDirection === 'up' ? -16 : 16;
  const dur = (base: number) => (reducedMotion ? 0.01 : isMobile ? base * 0.85 : base);

  const fadeInVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: ySmall },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: dur(0.65), ease: 'easeOut' as const },
      },
    }),
    [ySmall, dur]
  );

  const staggerContainerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0 : isMobile ? 0.12 : 0.16,
          delayChildren: reducedMotion ? 0 : 0.06,
        },
      },
    }),
    [isMobile, reducedMotion]
  );

  const standOutCardsStaggerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0 : isMobile ? 0.38 : 0.52,
          delayChildren: reducedMotion ? 0 : 0.18,
        },
      },
    }),
    [isMobile, reducedMotion]
  );

  const staggerItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reducedMotion ? 0 : scrollDirection === 'up' ? -14 : 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: dur(0.55), ease: 'easeOut' as const },
      },
    }),
    [scrollDirection, reducedMotion, dur]
  );

  return (
    <>
    <Box
      component="section"
      id="home"
      aria-label="Introduction"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 'calc(100dvh - 88px)', sm: 'calc(100dvh - 92px)', md: 'calc(100dvh - 96px)' },
        pt: { xs: 2, md: 3 },
        pb: { xs: 6, md: 8 },
        mb: { xs: 2, md: 3 },
        borderRadius: { xs: 0, md: 4 },
        border: { xs: 'none', md: '1px solid rgba(255,255,255,0.06)' },
        backgroundColor: 'background.paper',
        backgroundImage: [
          'radial-gradient(ellipse 120% 80% at 10% -20%, rgba(139, 92, 246, 0.22), transparent 55%)',
          'radial-gradient(ellipse 90% 60% at 90% 0%, rgba(6, 182, 212, 0.14), transparent 50%)',
          'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(167, 139, 250, 0.08), transparent 45%)',
        ].join(', '),
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center" sx={{ flex: 1 }}>
          <Grid item xs={12} md={6} sx={{ pt: { xs: 6, md: 2 } }} ref={heroTextRef}>
            <motion.div
              initial="hidden"
              animate={heroTextInView ? 'visible' : 'hidden'}
              variants={staggerContainerVariants}
            >
              <motion.div variants={staggerItemVariants}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.light', letterSpacing: '0.2em', fontWeight: 700 }}
                >
                  Hello there, I'm
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                    lineHeight: 1.08,
                    background: 'linear-gradient(135deg, #f5f3ff 0%, #e0f2fe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Egor Kharlamov
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography variant="h5" component="p" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
                  Proven tech leader and experienced infrastructure specalist with a decade of {'full\u2011stack'}{' '}
                  programming expertise.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 520 }}>
                  I build and direct teams which focus on delivery of reliable, scalable and secure cloud architecture.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Unlike many technology leaders - I'm still hands-on with the code. This site is hand-built.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => scrollToRef(projectsRef)}>
                    View portfolio
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="https://www.linkedin.com/in/egorkha/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Link
                    href="https://glizzy.fatelock.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 4 }}
                  >
                    Side project: Glizzy — online playing-card game
                  </Link>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} ref={heroImageRef} sx={{ pb: { xs: 12, md: 10 } }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                pt: { xs: 0, md: 1 },
                pb: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: { xs: 420, md: '100%' },
                  mx: 'auto',
                  aspectRatio: { xs: '4 / 5', md: '1 / 1.08' },
                  borderRadius: '50% / 44%',
                  overflow: 'hidden',
                  border: '2px solid rgba(167, 139, 250, 0.35)',
                  boxShadow: [
                    '0 28px 90px rgba(0,0,0,0.5)',
                    '0 0 0 1px rgba(255,255,255,0.06) inset',
                    '0 0 48px rgba(139, 92, 246, 0.18)',
                  ].join(', '),
                  background: 'linear-gradient(160deg, rgba(167,139,250,0.12), rgba(6,182,212,0.06))',
                }}
              >
                <motion.div
                  initial="hidden"
                  animate={heroImageInView ? 'visible' : 'hidden'}
                  variants={fadeInVariants}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Box
                    component="img"
                    src={profileImage}
                    alt="Egor Kharlamov"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: '50% 15%',
                      display: 'block',
                    }}
                  />
                </motion.div>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: { xs: -8, md: -4 },
                  width: 'min(100%, 440px)',
                  px: 2,
                  py: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(167, 139, 250, 0.28)',
                  background: 'linear-gradient(125deg, rgba(10,10,18,0.92) 0%, rgba(22,18,40,0.88) 100%)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                }}
              >
                <Typography
                  component="blockquote"
                  sx={{
                    m: 0,
                    pl: 2,
                    borderLeft: '3px solid',
                    borderColor: 'primary.light',
                    fontFamily: '"Syne", Georgia, serif',
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    fontWeight: 600,
                    fontStyle: 'italic',
                    lineHeight: 1.45,
                    letterSpacing: '-0.01em',
                    color: '#f5f3ff',
                    textShadow: '0 1px 18px rgba(0,0,0,0.45)',
                  }}
                >
                  <Box component="span" sx={{ color: 'primary.light', fontSize: '1.35em', lineHeight: 0, mr: 0.35, verticalAlign: '-0.08em' }}>
                    &ldquo;
                  </Box>
                  Whoever desires constant success must change his conduct with the times.
                  <Box component="span" sx={{ color: 'primary.light', fontSize: '1.35em', lineHeight: 0, ml: 0.25, verticalAlign: '-0.08em' }}>
                    &rdquo;
                  </Box>
                  <Typography
                    component="cite"
                    variant="body2"
                    sx={{
                      display: 'block',
                      mt: 1.25,
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontFamily: '"Inter", sans-serif',
                      color: 'rgba(224, 231, 255, 0.72)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}
                  >
                    — Niccolò Machiavelli
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: { xs: 16, md: 20 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            pointerEvents: 'none',
            zIndex: 2,
            opacity: showScrollHint ? 1 : 0,
            transform: showScrollHint ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
          aria-hidden={!showScrollHint}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              pointerEvents: 'none',
            }}
          >
            Scroll
          </Typography>
          <IconButton
            onClick={scrollToStandOut}
            aria-label="Scroll to How I stand out"
            tabIndex={showScrollHint ? 0 : -1}
            sx={{
              pointerEvents: 'auto',
              color: 'primary.light',
              border: '1px solid rgba(167, 139, 250, 0.35)',
              bgcolor: 'rgba(10, 10, 15, 0.45)',
              backdropFilter: 'blur(8px)',
              '&:hover': { bgcolor: 'rgba(167, 139, 250, 0.12)', borderColor: 'primary.light' },
            }}
          >
            <motion.span
              animate={
                reducedMotion || !showScrollHint
                  ? {}
                  : { y: [0, 6, 0], opacity: [0.85, 1, 0.85] }
              }
              transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: 28 }} />
            </motion.span>
          </IconButton>
        </Box>
      </Container>
    </Box>

    <Box
      component="section"
      id="differentiators"
      ref={setStandOutSectionRef}
      aria-label="How I stand out"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 5, md: 6 },
        mb: { xs: 2, md: 3 },
        borderRadius: { xs: 0, md: 4 },
        border: { xs: 'none', md: '1px solid rgba(255,255,255,0.06)' },
        backgroundColor: 'background.default',
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167, 139, 250, 0.08), transparent 55%)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center">
          <motion.div
            key={`stand-out-title-${standOutAnimKey}`}
            initial="hidden"
            animate={standOutEntered ? 'visible' : 'hidden'}
            variants={fadeInVariants}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              How I stand out
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
            What I bring to leadership roles - Reliable delivery, people management and engineering excellence.
            </Typography>
          </motion.div>

          <motion.div
            key={`stand-out-cards-${standOutAnimKey}`}
            initial="hidden"
            animate={standOutEntered ? 'visible' : 'hidden'}
            variants={standOutCardsStaggerVariants}
          >
            <Grid container spacing={2} justifyContent="center" alignItems="stretch">
              {valueProps.map((row) => (
                <Grid item xs={12} sm={4} key={row.title} sx={{ display: 'flex' }}>
                  <motion.div variants={staggerItemVariants} style={{ width: '100%', display: 'flex' }}>
                    <Card
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        '&:hover': reducedMotion
                          ? {}
                          : { transform: 'translateY(-4px)', borderColor: 'rgba(167, 139, 250, 0.35)' },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 2.5,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <row.icon sx={{ fontSize: 36, color: 'primary.main', mb: 1.5, flexShrink: 0 }} />
                        <Typography variant="h6" component="h3" gutterBottom sx={{ flexShrink: 0 }}>
                          {row.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                          {row.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default Profile;
