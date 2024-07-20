import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import profileImage from '../assets/images/headphones.jpg';
import '../styles/App.css';

// Variants for animation
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Profile: React.FC = () => {
    return (
        <Card elevation={0} sx={{ backgroundColor: 'transparent', maxWidth: '100%', overflow: 'hidden' }}>
            <CardContent sx={{ backgroundColor: 'transparent', p: 2 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* Text Section */}
                    <Grid item xs={12} md={6}>
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
                                I'm Egor Kharlamov. Experienced DevOps Engineer and below average React developer
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
                    <Grid item xs={12} md={6}>
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
                                    sx={{ width: '100%', height: 'auto', display: 'block' }}
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
                                    “If I could get out of bed at 8am I'd be fucking unstoppable.”
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Profile;
