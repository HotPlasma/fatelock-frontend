import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';
import profileImage from '../assets/images/profile.jpg';
import BuildIcon from '@mui/icons-material/Build';
import HttpIcon from '@mui/icons-material/Http';
import CodeIcon from '@mui/icons-material/Code';
import '../styles/App.css';

// Enhanced animation variants with directional awareness
const getDirectionalVariants = (scrollDirection: string, isMobile: boolean) => ({
    fadeInVariants: {
        hidden: { 
            opacity: 0, 
            y: scrollDirection === 'up' ? -30 : 30 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: isMobile ? 0.5 : 0.7,
                ease: "easeOut"
            }
        },
    },
    staggerContainerVariants: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    },
    staggerItemVariants: {
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
        }
    }
});

// Icons for the second section
const icons = [
    { component: BuildIcon, title: 'DevOps Engineer', description: 'I\'m very experienced in working with clients and stakeholders to identify their needs and translate requirements into cloud-based technical solutions, many of which are used by millions daily. I love automating away repetitive work and resolving critical issues causing blockers. It\'s very fulfilling. Even better lets discuss how to catch the problem early in future.' },
    { component: HttpIcon, title: 'Strong Fullstack Developer', description: 'Problem solver first and foremost. I\'ve fixed everything from android apps to windows servers to smart fridges. But don\'t just take my word for it. I may specalise in the cloud but that doesn\'t mean I can\'t make a react website or traceback an error in a language I\'m unfamilar with.' },
    { component: CodeIcon, title: 'Code Ownership Beyond Production', description: 'As a veteran of final line on call - I ensure all production incidents are swiftly actioned following best practices for minimal disruption in a way that will be auditable in future. I have lead investigations into critical tech issues for multinational giants and the UK government, production is safe in my hands.' },
];

interface ProfileProps {
    projectsRef: React.RefObject<HTMLDivElement>;
}

const Profile: React.FC<ProfileProps> = ({ projectsRef }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll direction detection
    const scrollDirection = useScrollDirection();

    // Use theme and media query hook to detect mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Get directional variants
    const variants = getDirectionalVariants(scrollDirection, isMobile);

    // Adaptive intersection observer settings based on viewport
    const getInViewOptions = (threshold: number) => ({
        triggerOnce: false,
        threshold: isMobile ? Math.max(threshold - 0.1, 0.1) : threshold,
        rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    });

    // Individual intersection observers for better control
    const { ref: heroTextRef, inView: heroTextInView } = useInView(getInViewOptions(0.2));
    const { ref: heroImageRef, inView: heroImageInView } = useInView(getInViewOptions(0.2));
    const { ref: sectionTitleRef, inView: sectionTitleInView } = useInView(getInViewOptions(0.3));
    const { ref: iconsRef, inView: iconsInView } = useInView(getInViewOptions(0.2));

    const ScrollOffset = 80; // Adjust as necessary for your AppBar height

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - ScrollOffset,
                behavior: 'smooth',
            });
        }
    };

    const handleProjectsClick = () => {
        if (projectsRef.current) {
            scrollToRef(projectsRef);
        }
    };

    return (
        <Card elevation={0} sx={{ backgroundColor: 'transparent', maxWidth: '100%', overflow: 'hidden' }}>
            <CardContent sx={{ backgroundColor: 'transparent', p: 2 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom={10}>
                    {/* Text Section */}
                    <Grid item xs={12} md={6} sx={{ mt: 8 }} ref={heroTextRef}>
                        <motion.div
                            initial="hidden"
                            animate={heroTextInView ? "visible" : "hidden"}
                            variants={variants.staggerContainerVariants}
                        >
                            <motion.div variants={variants.staggerItemVariants}>
                                <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                                    Hey there!
                                </Typography>
                            </motion.div>
                            <motion.div variants={variants.staggerItemVariants}>
                                <Typography variant="body1" gutterBottom color={'whitesmoke'} sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
                                    I'm Egor Kharlamov. Experienced multi-cloud DevOps Engineer Consultant with a background of over a decade of professional software development experience specialising in cloud infrastructure design, implementation and management.
                                </Typography>
                            </motion.div>
                            <motion.div variants={variants.staggerItemVariants}>
                                <Typography variant="body1" gutterBottom color={'whitesmoke'} sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
                                    And yes I made this website myself.
                                </Typography>
                            </motion.div>
                            <motion.div variants={variants.staggerItemVariants}>
                                <Box mt={2}>
                                    <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleProjectsClick}>
                                        View Professional Experience
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: isMobile ? 1 : 0 }}
                                        href="https://www.linkedin.com/in/egorkha/"
                                        target="_blank"
                                    >
                                        Contact on LinkedIn
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            background: 'linear-gradient(90deg, #a4508b 0%, #5f0a87 100%)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            width: isMobile ? '100%' : 'auto',
                                            boxShadow: '0 4px 10px 0 rgba(164,80,139,0.2)',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '1rem' },
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(90deg, #5f0a87 0%, #a4508b 100%)',
                                            },
                                        }}
                                        href="https://glizzy.fatelock.com"
                                        target="_blank"
                                    >
                                        CHECK OUT THIS NEW ONLINE PLAYING CARD GAME I MADE
                                    </Button>
                                </Box>
                            </motion.div>
                        </motion.div>
                    </Grid>
                    {/* Image Section */}
                    <Grid item xs={12} md={6} sx={{ mt: 8 }} ref={heroImageRef}>
                        <Box
                            display="inline-block"
                            position="relative"
                            borderRadius="25px"
                            overflow="hidden"
                            sx={{ width: '100%', height: 'auto' }}
                        >
                            <motion.div
                                initial="hidden"
                                animate={heroImageInView ? "visible" : "hidden"}
                                variants={variants.fadeInVariants}
                            >
                                <Box
                                    component="img"
                                    src={profileImage}
                                    alt="Egor Kharlamov"
                                    sx={{ width: '100%', height: 'auto', display: 'block', zIndex: "0" }}
                                />
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={heroImageInView ? "visible" : "hidden"}
                                variants={{
                                    hidden: { 
                                        opacity: 0, 
                                        y: scrollDirection === 'up' ? -15 : 15 
                                    },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0,
                                        transition: { 
                                            duration: 0.6, 
                                            delay: 0.3, 
                                            ease: "easeOut" 
                                        }
                                    }
                                }}
                            >
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    bgcolor="rgba(102, 45, 145, 0.3)"
                                    color="white"
                                    p={1}
                                    width="100%"
                                    textAlign="center"
                                >
                                    <Typography variant="caption" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                        "Whoever desires constant success must
                                        change his conduct with the times" - Niccolo
                                        Machiavelli
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>

                {/* Part 2 */}
                <Box mt={4} p={2} textAlign="center">
                    <motion.div
                        ref={sectionTitleRef}
                        initial="hidden"
                        animate={sectionTitleInView ? "visible" : "hidden"}
                        variants={variants.fadeInVariants}
                    >
                        <Typography variant="h3" component="h2" gutterBottom>
                            What I offer in a nutshell
                        </Typography>
                        <Typography variant="body1" color={'whitesmoke'} marginBottom={3}>
                            Experienced DevOps Engineer, Proven Technical Manager & Charismatic Team Lead
                        </Typography>
                    </motion.div>
                    
                    <motion.div
                        ref={iconsRef}
                        initial="hidden"
                        animate={iconsInView ? "visible" : "hidden"}
                        variants={variants.staggerContainerVariants}
                    >
                        <Grid container spacing={2} justifyContent="center">
                            {icons.map((icon, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <motion.div variants={variants.staggerItemVariants}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <icon.component sx={{ fontSize: 50, color: 'primary.main' }} />
                                            <Typography variant="h6" component="h3" gutterBottom color={'whitesmoke'}>
                                                {icon.title}
                                            </Typography>
                                            <Typography variant="body2" color={'whitesmoke'}>
                                                {icon.description}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Profile;
