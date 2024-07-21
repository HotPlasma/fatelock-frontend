import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImage from '../assets/images/headphones.jpg';
import BuildIcon from '@mui/icons-material/Build';
import HttpIcon from '@mui/icons-material/Http';
import CodeIcon from '@mui/icons-material/Code';
import '../styles/App.css';

// Variants for animation
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Icons for the second section
const icons = [
    { component: BuildIcon, title: 'DevOps Engineer', description: 'I\'m very experienced in working with clients and stakeholders to identify their needs and translate requirements into cloud-based technical solutions, many of which are used by millions daily. I love automating away repetitive work and resolving critical issues causing blockers. It\'s very fulfilling. Even better lets discuss how to catch the problem early in future.' },
    { component: HttpIcon, title: 'Strong Fullstack Developer', description: 'Problem solver first and foremost. I\'ve fixed everything from android apps to windows servers to smart fridges. But don\'t just take my word for it. I may specalise in the cloud but the doesn\'t mean I can\'t make a react website with the best of them!' },
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

    // Intersection Observer Hook for the second section
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    // Use theme and media query hook to detect mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleProjectsClick = () => {
        if (projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Card elevation={0} sx={{ backgroundColor: 'transparent', maxWidth: '100%', overflow: 'hidden' }}>
            <CardContent sx={{ backgroundColor: 'transparent', p: 2 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom={10}>
                    {/* Text Section */}
                    <Grid item xs={12} md={6} sx={{ mt: 8 }}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                                Hey there!
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Typography variant="body1" gutterBottom color={'whitesmoke'} sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
                                I'm Egor Kharlamov. Experienced AWS and Azure DevOps Engineer Consultant with a background of over 8 years of professional software development experience specialising in cloud infrastructure design, implementation and management.
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
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
                            </Box>
                        </motion.div>
                    </Grid>
                    {/* Image Section */}
                    <Grid item xs={12} md={6} sx={{ mt: 8 }}>
                        <Box
                            display="inline-block"
                            position="relative"
                            borderRadius="25px"
                            overflow="hidden"
                            sx={{ width: '100%', height: 'auto' }}
                        >
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInVariants}
                                transition={{ duration: 0.5, delay: 0.8 }}
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
                                animate="visible"
                                variants={fadeInVariants}
                                transition={{ duration: 0.5, delay: 1.0 }} // Add delay for the quote box
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
                                        “Whoever desires constant success must
                                        change his conduct with the times” - Niccolo
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
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={fadeInVariants}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Typography variant="h3" component="h2" gutterBottom>
                            What I offer in a nutshell
                        </Typography>
                        <Typography variant="body1" color={'whitesmoke'} marginBottom={3}>
                            Experienced DevOps Engineer, Proven Technical Manager & Charismatic Team Lead
                        </Typography>
                        <Grid container spacing={2} justifyContent="center" ref={sectionRef}>
                            {icons.map((icon, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <motion.div
                                        initial="hidden"
                                        animate={isMobile ? "visible" : (sectionInView ? "visible" : "hidden")}
                                        variants={fadeInVariants}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.5 }}
                                    >
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
