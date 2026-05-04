import React, { useEffect, useMemo } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import profileImage from '../assets/images/profile.jpg';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';

const valueProps = [
  {
    icon: GroupsOutlinedIcon,
    title: 'Team player',
    description:
      'I thrive in diverse technical environments — delegating effectively while staying ready to dive in personally when it matters.',
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: 'Knowledgeable & approachable',
    description:
      'I have managed multiple technical teams successfully through bespoke support, regular 1:1s, and clear expectations.',
  },
  {
    icon: AutoGraphOutlinedIcon,
    title: 'Always steering improvement',
    description:
      'I identify pain points, automate them away, and improve team morale and output over time with measurable engineering practices.',
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
  const { ref: sectionTitleRef, inView: sectionTitleInView } = useInView(getInViewOptions(0.25));
  const { ref: iconsRef, inView: iconsInView } = useInView(getInViewOptions(0.15));

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
    <Box
      component="section"
      id="home"
      aria-label="Introduction"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 2, md: 3 },
        pb: { xs: 6, md: 8 },
        mb: { xs: 2, md: 4 },
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
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
                  Portfolio
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
                  Proven tech leader and experienced lead DevOps engineer with a decade of full-stack programming
                  expertise.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 520 }}>
                  I direct technology strategy and delivery with a focus on cloud architecture, reliability, and teams
                  that ship — from NHS-scale platforms to high-traffic consumer experiences.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This site is hand-built in React — no template.
                </Typography>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => scrollToRef(projectsRef)}>
                    View experience
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

          <Grid item xs={12} md={6} ref={heroImageRef}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              }}
            >
              <motion.div initial="hidden" animate={heroImageInView ? 'visible' : 'hidden'} variants={fadeInVariants}>
                <Box
                  component="img"
                  src={profileImage}
                  alt="Egor Kharlamov"
                  sx={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: 1.5,
                  background: 'linear-gradient(to top, rgba(10,10,15,0.92), transparent)',
                }}
              >
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                  &ldquo;Whoever desires constant success must change his conduct with the times.&rdquo; — Niccolò
                  Machiavelli
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }} textAlign="center">
          <motion.div
            ref={sectionTitleRef}
            initial="hidden"
            animate={sectionTitleInView ? 'visible' : 'hidden'}
            variants={fadeInVariants}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              How I stand out
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
              Delivery, people, and engineering excellence — aligned with what I bring to leadership roles.
            </Typography>
          </motion.div>

          <motion.div
            ref={iconsRef}
            initial="hidden"
            animate={iconsInView ? 'visible' : 'hidden'}
            variants={staggerContainerVariants}
          >
            <Grid container spacing={2} justifyContent="center">
              {valueProps.map((row) => (
                <Grid item xs={12} sm={6} md={4} key={row.title}>
                  <motion.div variants={staggerItemVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'left',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        '&:hover': reducedMotion
                          ? {}
                          : { transform: 'translateY(-4px)', borderColor: 'rgba(167, 139, 250, 0.35)' },
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <row.icon sx={{ fontSize: 36, color: 'primary.main', mb: 1.5 }} />
                        <Typography variant="h6" component="h3" gutterBottom>
                          {row.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
  );
};

export default Profile;
