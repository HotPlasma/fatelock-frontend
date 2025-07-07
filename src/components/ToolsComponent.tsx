import { forwardRef } from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { FaAws, FaMicrosoft, FaPython, FaJava, FaNodeJs, FaDocker, FaGitAlt, FaReact, FaJenkins, FaGithub } from 'react-icons/fa';
import { FaGolang } from "react-icons/fa6";
import {
    SiCplusplus, SiTypescript, SiJavascript, SiTerraform, SiGnubash, SiPostgresql, SiAmazondynamodb,
    SiSplunk, SiPoetry, SiKubernetes
    // , SiGooglecloud
} from 'react-icons/si';

const clouds = [
    { component: FaAws, title: 'AWS', color: '#FF9900' },
    { component: FaMicrosoft, title: 'Azure', color: '#0078D4' },
    // { component: SiGooglecloud, title: 'GCP', color: '#ffffff' }
];

const languages = [
    { component: FaPython, title: 'Python', color: '#e2af49' },
    { component: SiTypescript, title: 'TypeScript', color: '#3178C6' },
    { component: SiJavascript, title: 'JavaScript', color: '#F7DF1E' },
    { component: SiGnubash, title: 'Bash', color: '#ffffff' },
    { component: FaGolang, title: 'Go', color: '#00aed9' },
    { component: SiCplusplus, title: 'C++', color: '#00599c' },
    { component: FaJava, title: 'Java', color: '#ec2025' },
];

const technologies = [
    { component: FaNodeJs, title: 'Node.js', color: '#339933' },
    { component: SiPoetry, title: 'Poetry', color: '#4b5fdf' },
    { component: FaDocker, title: 'Docker', color: '#2496ED' },
    { component: SiKubernetes, title: 'Kubernetes', color: '#326ce5' },
    { component: FaGitAlt, title: 'Git', color: '#F05032' },
    { component: SiTerraform, title: 'Terraform', color: '#623CE4' },
    { component: SiPostgresql, title: 'PostgreSQL', color: '#336791' },
    { component: SiAmazondynamodb, title: 'DynamoDB', color: '#2272ba' },
    { component: SiSplunk, title: 'Splunk', color: '#00b9eb' },
    { component: FaReact, title: 'React', color: '#2595d5' },
    { component: FaJenkins, title: 'Jenkins', color: '#d43530' },
    { component: FaGithub, title: 'Github Actions', color: '#000000' },
];

const ToolsComponent = forwardRef<HTMLDivElement>((props, ref) => {
    // Use theme and media query hook to detect mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Scroll direction detection
    const scrollDirection = useScrollDirection();

    // Adaptive intersection observer settings
    const getInViewOptions = (threshold: number) => ({
        triggerOnce: false,
        threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    });

    // Multiple intersection observers for different sections
    const { ref: titleRef, inView: titleInView } = useInView(getInViewOptions(0.3));
    const { ref: cloudsRef, inView: cloudsInView } = useInView(getInViewOptions(0.2));
    const { ref: languagesRef, inView: languagesInView } = useInView(getInViewOptions(0.2));
    const { ref: technologiesRef, inView: technologiesInView } = useInView(getInViewOptions(0.2));

    // Combine both refs into one
    const combinedRef = (node: HTMLDivElement) => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref.current !== undefined) {
                ref.current = node;
            }
        }
    };

    // Enhanced animation variants with scroll direction
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

    const sectionTitleVariants = {
        hidden: { 
            opacity: 0, 
            y: scrollDirection === 'up' ? -15 : 15 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
    };

    // Stagger container variants for each section
    const staggerContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.1 : 0.15,
                delayChildren: 0.1
            }
        }
    };

    const staggerItemVariants = {
        hidden: { 
            opacity: 0, 
            y: scrollDirection === 'up' ? -20 : 20,
            scale: 0.8
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: isMobile ? 0.4 : 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <Box ref={combinedRef} mt={4} p={2} textAlign="center" {...props}>
            <motion.div
                ref={titleRef}
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                variants={titleVariants}
            >
                <Typography variant="h3" component="h2" gutterBottom>
                    Tools of the Trade
                </Typography>
            </motion.div>

            {/* Cloud Providers Section */}
            <motion.div
                initial="hidden"
                animate={cloudsInView ? "visible" : "hidden"}
                variants={sectionTitleVariants}
            >
                <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={2} marginTop={3}>
                    These are the cloud providers I frequently work with
                </Typography>
            </motion.div>
            
            <motion.div
                ref={cloudsRef}
                initial="hidden"
                animate={cloudsInView ? "visible" : "hidden"}
                variants={staggerContainerVariants}
            >
                <Grid container spacing={4} justifyContent="center">
                    {clouds.map((tool, index) => (
                        <Grid item xs={6} sm={2} md={1} key={index}>
                            <motion.div variants={staggerItemVariants}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <tool.component size={50} color={tool.color} />
                                    <Typography variant="h6" component="h3" gutterBottom color={'whitesmoke'}>
                                        {tool.title}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>

            {/* Programming Languages Section */}
            <motion.div
                initial="hidden"
                animate={languagesInView ? "visible" : "hidden"}
                variants={sectionTitleVariants}
            >
                <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={2} marginTop={3}>
                    Programming Languages I have experience with
                </Typography>
            </motion.div>
            
            <motion.div
                ref={languagesRef}
                initial="hidden"
                animate={languagesInView ? "visible" : "hidden"}
                variants={staggerContainerVariants}
            >
                <Grid container spacing={4} justifyContent="center">
                    {languages.map((tool, index) => (
                        <Grid item xs={6} sm={4} md={1.5} key={index}>
                            <motion.div variants={staggerItemVariants}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <tool.component size={50} color={tool.color} />
                                    <Typography variant="h6" component="h3" gutterBottom color={'whitesmoke'}>
                                        {tool.title}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>

            {/* Technologies Section */}
            <motion.div
                initial="hidden"
                animate={technologiesInView ? "visible" : "hidden"}
                variants={sectionTitleVariants}
            >
                <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={2} marginTop={3}>
                    Technologies I have used extensively
                </Typography>
            </motion.div>
            
            <motion.div
                ref={technologiesRef}
                initial="hidden"
                animate={technologiesInView ? "visible" : "hidden"}
                variants={staggerContainerVariants}
            >
                <Grid container spacing={4} justifyContent="center">
                    {technologies.map((tool, index) => (
                        <Grid item xs={6} sm={4} md={1.5} key={index}>
                            <motion.div variants={staggerItemVariants}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <tool.component size={50} color={tool.color} />
                                    <Typography variant="h6" component="h3" gutterBottom color={'whitesmoke'}>
                                        {tool.title}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
});

export default ToolsComponent;
