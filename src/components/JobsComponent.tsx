import { forwardRef, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import SGImage from '../assets/images/SG.jpg';
import DroplessImage from '../assets/images/dropless.jpg';
import BJSSImage from '../assets/images/bjss.jpg';
import Low6Image from '../assets/images/low6.png';

type Job = {
  image: string;
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  extraBullets?: string[];
  liveSite: string;
  current?: boolean;
};

const jobs: Job[] = [
  {
    image: Low6Image,
    company: 'Low6',
    title: 'Head of Technology',
    period: 'November 2024 – Present',
    location: 'Remote, England',
    summary:
      'Market-leading creator of free-to-play experiences that improve brand engagement. I directed technology strategy and delivery across cloud architecture, backend, web, and native mobile while managing large distributed teams.',
    bullets: [
      'Global engineering leadership (UK, US, Canada, Ukraine, India) with hands-on ownership across TypeScript, Go, Node, React, React Native, Fastify/Express, Drizzle-ORM, PostgreSQL, Azure, and AWS.',
      'Instilled a reliability culture: SLIs/SLOs, error budgets, blameless post-incident reviews, and continuous learning loops.',
      'Planned and created architecture for extreme scale (1M+ concurrent users) with caching, event-driven offload, autoscaling, and load testing (e.g. Gatling) ahead of major releases.',
      'Completed enterprise client work (BBC, NHL, ITV, and more): solution design, pitches, and delivery planning that win and ship.',
      'HandledISO27001 and strong privacy posture; IaC with Terraform/OpenTofu; consolidated cloud operations (including closing AWS within six months where it made sense).',
      'AI-assisted engineering: led redesign of workflows using Claude Code Max with senior developers for requirements → tickets → docs → planning before agent-assisted implementation; independent AI (Qodo Merge) on initial PR review before humans.',
      'Added production observability with Azure Insights and Sentry; on-call with PagerDuty and clear escalation training.',
    ],
    liveSite: 'https://www.low6.com/',
    current: true,
  },
  {
    image: BJSSImage,
    company: 'BJSS / CGI',
    title: 'DevOps Engineer & Squad Lead',
    period: 'July 2022 – November 2024',
    location: 'Bristol, England',
    summary:
      'Consulted as a DevOps Engineer for the NHS Login Platform of over 42 million users — a fully serverless platform used by tens of millions of people — with a focus on safe, frequent releases and platform hardening.',
    bullets: [
      'Led 5+ production releases per week with auditable change and fast, well-assessed incident response.',
      'AWS with CDK and Python: CodePipeline, CodeBuild, DynamoDB, CloudWatch, Lambda, IAM, Step Functions, ECS on Fargate.',
      'Security automation: Dockerised ClamAV definition updates on ECS Fargate; Nexus IQ in pipelines to block vulnerable dependencies.',
      'Created and owned path-to-live test automation (BrowserStack, Locust, JMeter, Postman) gating production.',
      'Cross-account event forwarding into Slack for actionable alarms; AWS workshops for developers.',
      'Squad lead for seven engineers: ways of working, growth conversations, and team health.',
    ],
    liveSite: 'https://www.bjss.com/',
  },
  {
    image: DroplessImage,
    company: 'Dropless',
    title: 'Lead Cloud Engineer',
    period: 'May 2021 – July 2022',
    location: 'Bristol, England',
    summary:
      'Scale-up SaaS (car services) — kept releases smooth, automated toil, and led a full migration from proprietary hosting to AWS.',
    bullets: [
      'Designed and executed migration to AWS with CloudFormation, ECS, blue/green environments, and chat-integrated alarms.',
      'Migrated databases from on-prem to AWS using RDS and DynamoDB',
      'Full-stack support across React, React Native, Angular, TypeScript, Sequelize, and PostgreSQL.',
      'Replaced legacy cron with Lambda functions with Jest tests, pipelines, and CloudWatch alarms per function.',
    ],
    liveSite: 'https://dropless.co.uk/',
  },
  {
    image: SGImage,
    company: 'Scientific Games Digital / Light & Wonder',
    title: 'Lead Game Developer',
    period: 'April 2017 – May 2021',
    location: 'Bristol, England',
    summary:
      'Industry-leading iGaming supplier — led large game teams, shipped many titles, and bridged engineering with management.',
    bullets: [
      'Led a team of 23 game developers (six direct reports) across 50+ new titles and 200+ legacy projects.',
      'Shipped slot games with TypeScript/Node frontends and C++ maths engines; later owned DevOps-heavy workflows (EC2, Jenkins, Linux/Windows Servers).',
      'Agile delivery, customer-driven triage, cross-department process improvements, mentoring, and hiring.',
      'Handled production deployments, outages and incidents with actionable insights and post-incident reviews.'
    ],
    liveSite: 'https://igaming-demo.lnw.com/checkage',
  },
];

const JobsComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollDirection = useScrollDirection();
  const reducedMotion = usePrefersReducedMotion();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getInViewOptions = (threshold: number) => ({
    triggerOnce: false,
    threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
    rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -60px 0px',
  });

  const { ref: sectionRef, inView: sectionInView } = useInView(getInViewOptions(0.12));
  const { ref: titleRef, inView: titleInView } = useInView(getInViewOptions(0.25));

  const combinedRef = (node: HTMLDivElement) => {
    if (ref) {
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
    sectionRef(node);
  };

  const yTitle = reducedMotion ? 0 : scrollDirection === 'up' ? -16 : 16;
  const titleVariants = {
    hidden: { opacity: 0, y: yTitle },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  const staggerContainerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reducedMotion ? 0 : isMobile ? 0.42 : 0.58,
          delayChildren: reducedMotion ? 0 : 0.2,
          staggerDirection: scrollDirection === 'up' ? -1 : 1,
        },
      },
    }),
    [isMobile, reducedMotion, scrollDirection]
  );

  const flyDistance = isMobile ? 56 : 96;

  const jobCardVariants = useMemo(
    () => ({
      hidden: (index: number) => {
        if (reducedMotion) return { opacity: 0, x: 0 };
        const scrollingUp = scrollDirection === 'up';
        const fromLeft = scrollingUp ? index % 2 === 1 : index % 2 === 0;
        return {
          opacity: 0,
          x: fromLeft ? -flyDistance : flyDistance,
        };
      },
      visible: (_index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          duration: reducedMotion ? 0 : isMobile ? 0.62 : 0.82,
          ease: 'easeOut' as const,
        },
      }),
    }),
    [scrollDirection, reducedMotion, isMobile, flyDistance]
  );

  return (
    <Box component="section" id="portfolio" aria-label="Portfolio and professional experience" sx={{ py: { xs: 2, md: 3 } }} ref={combinedRef} {...props}>
      <motion.div ref={titleRef} initial="hidden" animate={titleInView ? 'visible' : 'hidden'} variants={titleVariants}>
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700 }}>
            Portfolio
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            Roles I've held since graduating from university.
          </Typography>
        </Box>
      </motion.div>

      <motion.div initial="hidden" animate={sectionInView ? 'visible' : 'hidden'} variants={staggerContainerVariants}>
        <Grid container spacing={3} justifyContent="center">
          {jobs.map((job, index) => (
            <Grid item xs={12} key={index}>
              <motion.div custom={index} variants={jobCardVariants}>
                <Card
                  sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                  }}
                >
                  <Box
                    sx={{
                      flex: { xs: '0 0 200px', md: '0 0 42%' },
                      position: 'relative',
                      minHeight: { xs: 200, md: 320 },
                    }}
                  >
                    <Box
                      component="img"
                      src={job.image}
                      alt={job.company}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,10,15,0.92) 0%, transparent 55%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <Box sx={{ position: 'absolute', left: 16, top: 16, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        size="small"
                        label={job.company}
                        sx={{ bgcolor: 'rgba(10,10,15,0.65)', color: 'text.primary', border: '1px solid rgba(255,255,255,0.12)' }}
                      />
                      {job.current && (
                        <Chip
                          size="small"
                          label="Current"
                          color="primary"
                          sx={{ fontWeight: 700, color: '#fff' }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        left: 16,
                        bottom: 14,
                        color: 'rgba(255,255,255,0.88)',
                        display: 'block',
                        maxWidth: '90%',
                      }}
                    >
                      {job.period} · {job.location}
                    </Typography>
                  </Box>

                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 3, px: { xs: 2, md: 3 } }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {job.summary}
                    </Typography>
                    <List dense disablePadding sx={{ mb: 2 }}>
                      {job.bullets.map((b, bi) => (
                        <ListItem key={`${index}-b-${bi}`} disableGutters sx={{ alignItems: 'flex-start', py: 0.35 }}>
                          <ListItemIcon sx={{ minWidth: 22, mt: 0.6 }}>
                            <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.light' }} />
                          </ListItemIcon>
                          <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }} primary={b} />
                        </ListItem>
                      ))}
                    </List>
                    {job.extraBullets && job.extraBullets.length > 0 && (
                      <>
                        <Collapse in={expandedId === index} timeout="auto">
                          <List dense disablePadding sx={{ mb: 2 }}>
                            {job.extraBullets.map((b, ei) => (
                              <ListItem key={`${index}-e-${ei}`} disableGutters sx={{ alignItems: 'flex-start', py: 0.35 }}>
                                <ListItemIcon sx={{ minWidth: 22, mt: 0.6 }}>
                                  <FiberManualRecordIcon sx={{ fontSize: 8, color: 'secondary.main' }} />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }} primary={b} />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => setExpandedId(expandedId === index ? null : index)}
                          sx={{ alignSelf: 'flex-start', mb: 1 }}
                        >
                          {expandedId === index ? 'Show less' : 'Read more'}
                        </Button>
                      </>
                    )}
                    <Box>
                      <Button variant="contained" color="primary" href={job.liveSite} target="_blank" rel="noopener noreferrer">
                        Company site
                      </Button>
                    </Box>
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

export default JobsComponent;
