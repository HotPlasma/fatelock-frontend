import React, { forwardRef, useCallback } from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { FaAws, FaMicrosoft, FaPython, FaNodeJs, FaDocker, FaGitAlt, FaReact, FaJenkins, FaGithub } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BugReportIcon from '@mui/icons-material/BugReport';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiTerraform,
  SiGnubash,
  SiPostgresql,
  SiAmazondynamodb,
  SiSplunk,
  SiKubernetes,
} from 'react-icons/si';

type CloudEntry = { component: React.ComponentType<{ size?: number; color?: string }>; title: string; color: string };
type LangEntry = CloudEntry;
type TechEntry =
  | CloudEntry
  | {
      component: React.ComponentType<{ sx?: object }>;
      title: string;
      color: string;
      mui: true;
    };

const clouds: CloudEntry[] = [
  { component: FaAws, title: 'AWS', color: '#FF9900' },
  { component: FaMicrosoft, title: 'Azure', color: '#0078D4' },
];

const languages: LangEntry[] = [
  { component: FaPython, title: 'Python', color: '#e2af49' },
  { component: SiTypescript, title: 'TypeScript', color: '#3178C6' },
  { component: SiJavascript, title: 'JavaScript', color: '#F7DF1E' },
  { component: SiGnubash, title: 'Bash', color: '#ffffff' },
  { component: FaGolang, title: 'Go', color: '#00aed9' },
  { component: SiCplusplus, title: 'C++', color: '#00599c' },
];

const technologies: TechEntry[] = [
  { component: FaNodeJs, title: 'Node.js', color: '#339933' },
  { component: ElectricBoltIcon, title: 'Fastify', color: '#ef4444', mui: true },
  { component: FaDocker, title: 'Docker', color: '#2496ED' },
  { component: SiKubernetes, title: 'Kubernetes', color: '#326ce5' },
  { component: FaGitAlt, title: 'Git', color: '#F05032' },
  { component: SiTerraform, title: 'Terraform', color: '#623CE4' },
  { component: SiPostgresql, title: 'PostgreSQL', color: '#336791' },
  { component: SiAmazondynamodb, title: 'DynamoDB', color: '#2272ba' },
  { component: SiSplunk, title: 'Splunk', color: '#00b9eb' },
  { component: QueryStatsIcon, title: 'Datadog', color: '#632ca6', mui: true },
  { component: BugReportIcon, title: 'Sentry', color: '#fb4226', mui: true },
  { component: FaReact, title: 'React', color: '#2595d5' },
  { component: SmartphoneIcon, title: 'React Native', color: '#61dafb', mui: true },
  { component: FaJenkins, title: 'Jenkins', color: '#d43530' },
  { component: FaGithub, title: 'GitHub Actions', color: '#ffffff' },
  { component: NotificationsActiveIcon, title: 'PagerDuty', color: '#06ac38', mui: true },
];

function ToolIcon({ tool }: { tool: TechEntry | CloudEntry | LangEntry }) {
  if ('mui' in tool && tool.mui) {
    const Icon = tool.component;
    return <Icon sx={{ fontSize: 48, color: tool.color }} />;
  }
  const Icon = tool.component as React.ComponentType<{ size?: number; color?: string }>;
  return <Icon size={48} color={tool.color} />;
}

const ToolsComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollDirection = useScrollDirection();
  const reducedMotion = usePrefersReducedMotion();

  const getInViewOptions = (threshold: number) => ({
    triggerOnce: false,
    threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px',
  });

  const { ref: inViewRef, inView: rootInView } = useInView(getInViewOptions(0.08));
  const { ref: cloudsRef, inView: cloudsInView } = useInView(getInViewOptions(0.15));
  const { ref: languagesRef, inView: languagesInView } = useInView(getInViewOptions(0.15));
  const { ref: technologiesRef, inView: technologiesInView } = useInView(getInViewOptions(0.12));

  const mergedRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef(node);
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    },
    [inViewRef, ref]
  );

  const yNudge = reducedMotion ? 0 : scrollDirection === 'up' ? -14 : 14;

  const titleVariants = {
    hidden: { opacity: 0, y: yNudge },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : scrollDirection === 'up' ? -10 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' as const },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : isMobile ? 0.06 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  };

  const staggerItemVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : scrollDirection === 'up' ? -14 : 14,
      scale: reducedMotion ? 1 : 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reducedMotion ? 0 : isMobile ? 0.35 : 0.45, ease: 'easeOut' as const },
    },
  };

  return (
    <Box
      component="section"
      id="skills"
      aria-label="Skills and technologies"
      ref={mergedRootRef}
      sx={{ py: { xs: 1, md: 2 } }}
      {...props}
    >
      <motion.div initial="hidden" animate={rootInView ? 'visible' : 'hidden'} variants={titleVariants}>
        <Card sx={{ mb: 3, textAlign: 'center', py: { xs: 2, md: 3 }, px: 2 }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700 }}>
            Tools of the trade
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            I have significant experience with the following tools and technologies.
          </Typography>
        </Card>
      </motion.div>

      <motion.div
        ref={cloudsRef}
        initial="hidden"
        animate={cloudsInView ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={sectionTitleVariants}>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
            Cloud providers
          </Typography>
        </motion.div>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {clouds.map((tool, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <motion.div variants={staggerItemVariants}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2.5 }}>
                    <ToolIcon tool={tool} />
                    <Typography variant="subtitle2" sx={{ mt: 1.5, color: 'text.primary' }}>
                      {tool.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        ref={languagesRef}
        initial="hidden"
        animate={languagesInView ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={sectionTitleVariants}>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
            Languages
          </Typography>
        </motion.div>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {languages.map((tool, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <motion.div variants={staggerItemVariants}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2.5 }}>
                    <ToolIcon tool={tool} />
                    <Typography variant="subtitle2" sx={{ mt: 1.5, color: 'text.primary' }}>
                      {tool.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        ref={technologiesRef}
        initial="hidden"
        animate={technologiesInView ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <motion.div variants={sectionTitleVariants}>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" sx={{ mb: 2, fontWeight: 600 }}>
            Technologies & platforms
          </Typography>
        </motion.div>
        <Grid container spacing={2} justifyContent="center">
          {technologies.map((tool, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <motion.div variants={staggerItemVariants}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2.5 }}>
                    <ToolIcon tool={tool} />
                    <Typography variant="subtitle2" sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
                      {tool.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
});

export default ToolsComponent;
