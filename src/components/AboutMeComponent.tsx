import { useState, forwardRef } from 'react';
import { Box, Typography, Grid, Button, Collapse, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ProfileImage from '../assets/images/portrait.jpg';
import { useInView } from 'react-intersection-observer';
import { useScrollDirection } from '../hooks/useScrollDirection';

const AboutComponent = forwardRef<HTMLDivElement>((props, ref) => {
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
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -80px 0px'
    });

    const { ref: sectionRef, inView: sectionInView } = useInView(getInViewOptions(0.2));

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
    const fadeInLeftVariants = {
        hidden: { 
            opacity: 0, 
            x: isMobile ? 0 : (scrollDirection === 'up' ? 30 : -50),
            y: isMobile ? (scrollDirection === 'up' ? -20 : 20) : 0
        },
        visible: { 
            opacity: 1, 
            x: 0,
            y: 0,
            transition: {
                duration: isMobile ? 0.4 : 0.6,
                ease: "easeOut"
            }
        },
    };

    const fadeInRightVariants = {
        hidden: { 
            opacity: 0, 
            x: isMobile ? 0 : (scrollDirection === 'up' ? -30 : 50),
            y: isMobile ? (scrollDirection === 'up' ? -20 : 20) : 0
        },
        visible: { 
            opacity: 1, 
            x: 0,
            y: 0,
            transition: {
                duration: isMobile ? 0.4 : 0.6,
                ease: "easeOut"
            }
        },
    };

    // Stagger container for text content
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
            y: scrollDirection === 'up' ? -15 : 15 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <Box mt={4} p={2} textAlign="center" ref={combinedRef} {...props}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={fadeInLeftVariants}
                    >
                        <Box
                            component="img"
                            src={ProfileImage}
                            alt="Egor Kharlamov"
                            sx={{ width: '100%', borderRadius: '30px', boxShadow: 20 }}
                        />
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial="hidden"
                        animate={sectionInView ? "visible" : "hidden"}
                        variants={staggerContainerVariants}
                    >
                        <motion.div variants={staggerItemVariants}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                About Egor Kharlamov
                            </Typography>
                        </motion.div>
                        <motion.div variants={staggerItemVariants}>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                I'm a professional and certified DevOps Engineer based in Bristol, with a rich background in full-stack development. My journey into DevOps began unexpectedly during my first role as a developer. The servers were frequently down and with the infrastructure team based in America, I was left waiting until 2 PM for them to address the issues.
                            </Typography>
                        </motion.div>
                        <motion.div variants={staggerItemVariants}>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                Frustrated by the delays, I requested AWS access to handle the problems myself. This initiative not only resolved our issues more efficiently but also sparked my passion for cloud infrastructure. I quickly became the go-to person for any platform problems and I found immense satisfaction in this role.
                            </Typography>
                        </motion.div>
                        <motion.div variants={staggerItemVariants}>
                            <Typography variant="body1" color="whitesmoke" paragraph>
                                Realising that I enjoyed this work far more than traditional development, I decided to pivot my career towards cloud infrastructure and DevOps. In my next role, I fully embraced this path, dedicating myself to mastering the cloud.
                            </Typography>
                        </motion.div>
                        <motion.div variants={staggerItemVariants}>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Typography variant="body1" color="whitesmoke" paragraph>
                                    In my subsequent role, I had the opportunity to scale a startup by migrating them from on-premises servers to AWS. This experience was invaluable, as my first role had involved working with traditional EC2 Windows and Linux boxes with CI/CD handled with Jenkins. At the startup, we utilized React for our frontend, Angular for our internal admin portal and Node.js and TypeScript for our backend, with Sequelize and PostgreSQL as our database. I dockerized these components and ran them through ECS Fargate, using CloudFormation to template our infrastructure, preparing us for expansion beyond the UK.
                                </Typography>
                                <Typography variant="body1" color="whitesmoke" paragraph>
                                    Next, I was a DevOps Engineer consulting for the NHS Platform, which serves over 42 million users. This was an excellent role, allowing me to work on a large scale with cutting-edge technologies. We heavily rely on CodePipeline for CI/CD, Cognito for authentication, ECS for container management, Lambdas for serverless functions, DynamoDB for our database needs and CDK for defining our cloud infrastructure. This role has further solidified my expertise and passion for cloud technologies.
                                </Typography>
                                <Typography variant="body1" color="whitesmoke" paragraph>
                                    Today, I am Head of Technology at Low6, a free-to-play market leader in the iGaming industry. An excellent scaling-up business in which I am responsible for the technology team and the infrastructure that powers the business. Leading a team of 17+ developers, I ensure techical excellence in frontend, backend, mobile and infrastructure. I have gained a ton of experience with Azure, Redis, Terraform(OpenTofu), Fastify, React Native and with so much responsbiility the learning opportunities are constant. I'm hugely excited to have proven myself to be capable of being the most senior techical person in a business and often wonder where I will take Low6 what comes next.
                                </Typography>
                                <Typography variant="body1" color="whitesmoke" paragraph>
                                    Outside of work, I love a pint with good company, diving into a great long video game and reading fantasy series like the First Law series by Joe Abercrombie and the Stormlight Archive by Brandon Sanderson.
                                </Typography>
                            </Collapse>
                        </motion.div>
                        <motion.div variants={staggerItemVariants}>
                            <Button variant="text" color="primary" onClick={handleToggle}>
                                {expanded ? 'read less' : 'read more'}
                            </Button>
                        </motion.div>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
});

export default AboutComponent;
