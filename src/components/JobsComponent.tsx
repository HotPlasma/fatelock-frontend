import { forwardRef } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import SGImage from '../assets/images/SG.jpg';
import DroplessImage from '../assets/images/dropless.jpg';
import BJSSImage from '../assets/images/bjss.jpg';
import Low6Image from '../assets/images/low6.png';

const JobsComponent = forwardRef<HTMLDivElement>((props, ref) => {
    // Use theme and media query hook to detect mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Scroll direction detection
    const scrollDirection = useScrollDirection();

    // Adaptive intersection observer settings
    const getInViewOptions = (threshold: number) => ({
        triggerOnce: false,
        threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -60px 0px'
    });

    const { ref: sectionRef, inView: sectionInView } = useInView(getInViewOptions(0.2));
    const { ref: titleRef, inView: titleInView } = useInView(getInViewOptions(0.3));

    // Combine both refs into one
    const combinedRef = (node: HTMLDivElement) => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref.current !== undefined) {
                ref.current = node;
            }
        }
        sectionRef(node);
    };

    // Enhanced animation variants with mobile consideration and scroll direction
    const fadeInVariants = (direction: string) => ({
        hidden: {
            opacity: 0,
            x: isMobile ? 0 : (scrollDirection === 'up' ? -20 : 20),
            y: isMobile ? (scrollDirection === 'up' ? -30 : 30) : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: isMobile ? 0.5 : 0.7,
                ease: "easeOut"
            }
        },
    });

    // Title animation
    const titleVariants = {
        hidden: { 
            opacity: 0, 
            y: scrollDirection === 'up' ? -20 : 20 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    // Stagger container for job cards with directional awareness
    const staggerContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.2 : 0.3,
                delayChildren: 0.1,
                // Reverse stagger direction when scrolling up
                staggerDirection: scrollDirection === 'up' ? -1 : 1
            }
        }
    };

    const staggerItemVariants = {
        hidden: { 
            opacity: 0, 
            y: scrollDirection === 'up' ? -30 : 30,
            x: isMobile ? 0 : (scrollDirection === 'up' ? -15 : 15)
        },
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0,
            transition: {
                duration: isMobile ? 0.5 : 0.7,
                ease: "easeOut"
            }
        }
    };

    const jobs = [
        {
            image: Low6Image,
            company: 'Low6',
            title: 'Head of Technology (Current Role)',
            description: 'Low6 is a free-to-play market leader in the iGaming industry. I am responsible for the technology team and the infrastructure that powers the business. Leading a team of 17+ developers, I ensure techical excellence in frontend, backend, mobile and infrastructure.',
            liveSite: 'https://www.low6.com/',
            checkCode: '#',
        },
        {
            image: BJSSImage,
            company: 'BJSS - Aquired by CGI',
            title: 'DevOps Engineer & Squad Lead',
            description: 'Consulted as a DevOps Engineer for the NHS Login Platform of over 42 million users. Dockerised code, improved security by adding vulnerability scans to all pipelines, created developer testing infrastructure. Deployed code changes including features to production 8+ times per week and resolved complex issues while on call.',
            liveSite: 'https://www.bjss.com/',
            checkCode: '#',
        },
        {
            image: DroplessImage,
            company: 'Dropless',
            title: 'Lead Cloud Engineer',
            description: 'Moved this scale up company from on-prem to AWS. The final solution included Cloudfront, Cloudformation, ECS, CodePipeline, RDS (postgres), lambdas and cloudwatch.',
            liveSite: 'https://dropless.co.uk/',
            checkCode: '#',
        },
        {
            image: SGImage,
            company: 'SG Digital',
            title: 'Lead Game Developer',
            description: 'Developed Slot Games with Typescript and C++, later took on a more DevOps role using EC2, Jenkins, Linux and windows servers.',
            liveSite: 'https://igaming-demo.lnw.com/checkage',
            checkCode: '#',
        },
    ];

    return (
        <Box mt={4} p={2} textAlign="center" ref={combinedRef} {...props}>
            <motion.div
                ref={titleRef}
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                variants={titleVariants}
            >
                <Typography variant="h3" component="h2" gutterBottom>
                    Professional Experience
                </Typography>
                <Typography variant="body1" color="whitesmoke" paragraph>
                    Ask me on LinkedIn for a CV with more info on these
                </Typography>
            </motion.div>
            
            <motion.div
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                variants={staggerContainerVariants}
            >
                <Grid container spacing={4} justifyContent="center">
                    {jobs.map((job, index) => (
                        <Grid item xs={12} md={8} key={index}>
                            <motion.div variants={staggerItemVariants}>
                                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 4, position: 'relative' }}>
                                    <Box sx={{ flex: '1 1 50%', position: 'relative' }}>
                                        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            padding: '4px 8px',
                                            bgcolor: 'rgba(102, 45, 145, 0.7)',
                                            borderRadius: '4px'
                                        }}>
                                            <Typography variant="caption" color="white">
                                                {job.company}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {job.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" paragraph>
                                            {job.description}
                                        </Typography>
                                        <Box>
                                            <Button variant="contained" color="primary" sx={{ mr: 2 }} href={job.liveSite} target="_blank">
                                                Company Website
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
