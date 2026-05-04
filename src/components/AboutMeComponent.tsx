import { useState, forwardRef, useMemo } from 'react';
import { Box, Typography, Grid, Button, Collapse, useMediaQuery, useTheme, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import ProfileImage from '../assets/images/portrait.jpg';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const AboutComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollDirection = useScrollDirection();
  const reducedMotion = usePrefersReducedMotion();

  const getInViewOptions = (threshold: number) => ({
    triggerOnce: false,
    threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
    rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -80px 0px',
  });

  const { ref: sectionRef, inView: sectionInView } = useInView(getInViewOptions(0.15));

  const combinedRef = (node: HTMLDivElement) => {
    if (ref) {
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
    sectionRef(node);
  };

  const fadeInLeftVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        x: reducedMotion ? 0 : isMobile ? 0 : scrollDirection === 'up' ? 28 : -36,
        y: reducedMotion ? 0 : isMobile ? (scrollDirection === 'up' ? -14 : 14) : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: reducedMotion ? 0 : isMobile ? 0.4 : 0.55, ease: 'easeOut' as const },
      },
    }),
    [isMobile, scrollDirection, reducedMotion]
  );

  const staggerContainerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0 : isMobile ? 0.08 : 0.12,
          delayChildren: reducedMotion ? 0 : 0.06,
        },
      },
    }),
    [isMobile, reducedMotion]
  );

  const staggerItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reducedMotion ? 0 : scrollDirection === 'up' ? -12 : 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' as const },
      },
    }),
    [scrollDirection, reducedMotion]
  );

  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      component="section"
      id="about"
      aria-label="About"
      sx={{ py: 1 }}
      ref={combinedRef}
      {...props}
    >
      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        <Grid item xs={12} md={5}>
          <motion.div initial="hidden" animate={sectionInView ? 'visible' : 'hidden'} variants={fadeInLeftVariants}>
            <Card sx={{ height: '100%', overflow: 'hidden', p: 0 }}>
              <Box
                component="img"
                src={ProfileImage}
                alt="Egor Kharlamov"
                sx={{
                  width: '100%',
                  height: { xs: 'auto', md: '100%' },
                  minHeight: { md: 420 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <motion.div initial="hidden" animate={sectionInView ? 'visible' : 'hidden'} variants={staggerContainerVariants}>
                <motion.div variants={staggerItemVariants}>
                  <Typography variant="h2" component="h2" gutterBottom>
                    About
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItemVariants}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    I am a professional, certified cloud engineer based in Brackley, England, with a long background in
                    full-stack development. My move into platform work started pragmatically: servers were often down and
                    the infrastructure team was overseas, so I asked for AWS access and fixed what was blocking the team.
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItemVariants}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    That turned into a career theme — automating toil, making releases boring (in the best way), and being
                    the person who can go deep across the stack when production needs it. I have consulted at UK
                    government scale, scaled startups onto AWS, and now lead technology end-to-end.
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItemVariants}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Today I am Head of Technology at Low6, where I set direction for cloud architecture, reliability, and
                    engineering practices while staying close to delivery across TypeScript, Go, React, React Native, and
                    modern data stores. Recent focus areas include SLIs/SLOs, incident culture, AI-assisted engineering
                    workflows, and architecture proven at very large concurrent audiences — alongside ISO27001 and
                    demanding client security expectations.
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItemVariants}>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Earlier chapters include migrating a scale-up from on-prem to AWS (CloudFormation, ECS, blue/green,
                      strong observability), and NHS Login delivery with CDK-defined AWS, frequent production releases,
                      and comprehensive automated testing before go-live.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Outside of work I enjoy good company, long-form games, and fantasy series like Joe Abercrombie&apos;s
                      First Law and Brandon Sanderson&apos;s Stormlight Archive.
                    </Typography>
                  </Collapse>
                </motion.div>
                <motion.div variants={staggerItemVariants}>
                  <Button variant="text" color="primary" onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Read less' : 'Read more'}
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

export default AboutComponent;
