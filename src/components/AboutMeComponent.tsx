import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import ProfileImage from '../assets/images/portrait.jpg'; // Adjust the path to your profile image

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const AboutMe: React.FC = () => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <Box mt={4} p={2} textAlign="center">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Box
                            component="img"
                            src={ProfileImage}
                            alt="Vito Medlej"
                            sx={{ width: '100%', borderRadius: '10px', boxShadow: 3 }}
                        />
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Typography variant="h3" component="h1" gutterBottom>
                            About Egor Kharlamov
                        </Typography>
                        <Typography variant="body1" color="whitesmoke" paragraph>
                            I'm a 28-year-old DevOps Engineer based in Bristol, with a rich background in full-stack development. My journey into DevOps began unexpectedly during my first role as a developer. The servers were frequently down, and with the infrastructure team based in America, I was left waiting until 2 PM for them to address the issues.
                        </Typography>
                        <Typography variant="body1" color="whitesmoke" paragraph>
                            Frustrated by the delays, I requested AWS access to handle the problems myself. This initiative not only resolved our issues more efficiently but also sparked my passion for cloud infrastructure. I quickly became the go-to person for any platform problems, and I found immense satisfaction in this role.
                        </Typography>
                        <Typography variant="body1" color="whitesmoke" paragraph>
                            Realising that I enjoyed this work far more than traditional development, I decided to pivot my career towards cloud infrastructure and DevOps. In my next role, I fully embraced this path, dedicating myself to mastering the cloud.
                        </Typography>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                In my subsequent role, I had the opportunity to scale a startup by migrating them from on-premises servers to AWS. This experience was invaluable, as my first role had involved working with traditional EC2 Windows and Linux boxes with CI/CD handled with Jenkins. At the startup, we utilized React for our frontend, Angular for our internal admin portal, and Node.js and TypeScript for our backend, with Sequelize and PostgreSQL as our database. I dockerized these components and ran them through ECS Fargate, using CloudFormation to template our infrastructure, preparing us for expansion beyond the UK.
                            </Typography>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                Currently, I am a DevOps Engineer consulting for the NHS Platform, which serves over 42 million users. This role has been the best so far, allowing me to work on a large scale with cutting-edge technologies. We heavily rely on CodePipeline for CI/CD, Cognito for authentication, ECS for container management, Lambdas for serverless functions, DynamoDB for our database needs, and CDK for defining our cloud infrastructure. This role has further solidified my expertise and passion for cloud technologies and I'm really excited to see what I do next.
                            </Typography>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                Outside of work, I love a pint with good company, diving into a great long video game, and reading fantasy series like the First Law series by Joe Abercrombie and the Stormlight Archive by Brandon Sanderson.
                            </Typography>
                        </Collapse>
                        <Button variant="text" color="primary" onClick={handleToggle}>
                            {expanded ? 'read less' : 'read more'}
                        </Button>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutMe;
