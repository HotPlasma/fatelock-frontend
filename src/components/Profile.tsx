import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Divider } from '@mui/material';
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
    { component: BuildIcon, title: 'DevOps Engineer', description: 'I am experienced in working with clients and stakeholders to identify their needs and translate requirements into technical solutions, many of which are used by millions daily. I love automating away repetitive work and resolving critical issues. It\'s very fulfilling. Even better - catch the problem early in future.' },
    { component: HttpIcon, title: 'Strong Fullstack Developer', description: 'Problem solver first and foremost. I\'ve fixed everything from android apps to windows servers to smart fridges. But don\'t just take my word for it. I may specalise in the cloud but the doesn\'t mean I can\'t make a react website with the best of them!' },
    { component: CodeIcon, title: 'Code Ownership Beyond Production', description: 'As a veteran of final line on call - I ensure all production incidents are swiftly actioned following best practices for minimal disruption in a way that will be auditable in future. I have lead investigations into critical tech issues for multinational giants and the UK government, production is safe in my hands.' },
];

const Profile: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Intersection Observer Hook for the second section
    const { ref: sectionRef, inView: sectionInView } = useInView({
        // triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <Card elevation={0} sx={{ backgroundColor: 'transparent', maxWidth: '100%', overflow: 'hidden' }}>
            <CardContent sx={{ backgroundColor: 'transparent', p: 2 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center" marginBottom={30}>
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
                                I'm Egor Kharlamov. Experienced DevOps Engineer and below average React developer.
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Box mt={2}>
                                <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                                    View Projects
                                </Button>
                                <Button variant="outlined" color="primary">
                                    View Resume
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                    {/* Image Section */}
                    <Grid item xs={12} md={6} sx={{ mt: 8 }}> {/* Added top margin to avoid overlapping */}
                        <Box
                            display="inline-block"
                            position="relative"
                            borderRadius="8px"
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
                                    “If I could get out of bed at 8am I'd be unstoppable.”
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Part 2 */}
                <Box ref={sectionRef} mt={4} p={2} textAlign="center">
                    <motion.div
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={fadeInVariants}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Typography variant="h3" component="h2" gutterBottom>
                            You're busy, here's what you need to know
                        </Typography>
                        <Typography variant="body1" color={'whitesmoke'} marginBottom={3}>
                            Experienced DevOps Engineer, Proven Technical Manager & Charismatic Team Lead
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            {icons.map((icon, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <icon.component sx={{ fontSize: 50, color: 'primary.main' }} />
                                        <Typography variant="h6" component="h3" gutterBottom color={'whitesmoke'}>
                                            {icon.title}
                                        </Typography>
                                        <Typography variant="body2" color={'whitesmoke'}>
                                            {icon.description}
                                        </Typography>
                                    </Box>
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
