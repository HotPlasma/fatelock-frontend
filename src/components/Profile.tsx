import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import profileImage from '../assets/images/headphones.jpg';
import '../styles/App.css'


// Variants for animation
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Profile: React.FC = () => {
    return (
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <CardContent sx={{ backgroundColor: 'transparent' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* Text Section */}
                    <Box flex="1" pr={2}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="h3" component="h1" gutterBottom>
                                Hey there!
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Typography variant="body1" gutterBottom color={'whitesmoke'}>
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
                    </Box>
                    {/* Image Section */}
                    <Box
                        display="inline-block"
                        position="relative"
                        borderRadius="8px"
                        overflow="hidden"
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
                                sx={{ width: '30em', height: 'auto', display: 'block' }}
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
                            <Typography variant="caption">
                                “If I could get out of bed at 8am I'd be fucking unstoppable.”
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    );
};

export default Profile;
