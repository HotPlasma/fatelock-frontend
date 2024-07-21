import { forwardRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaAws, FaMicrosoft, FaPython, FaJava, FaNodeJs, FaDocker, FaGitAlt, FaReact, FaJenkins, FaGithub } from 'react-icons/fa';
import { FaGolang } from "react-icons/fa6";
import {
    SiCplusplus, SiTypescript, SiJavascript, SiTerraform, SiGnubash, SiPostgresql, SiAmazondynamodb,
    SiSplunk, SiPoetry
} from 'react-icons/si';

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const clouds = [
    { component: FaAws, title: 'AWS', color: '#FF9900' },
    { component: FaMicrosoft, title: 'Azure', color: '#0078D4' }
];

const languages = [
    { component: FaPython, title: 'Python', color: '#ffdc50' },
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
    const { ref: sectionRef, inView: sectionInView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

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

    return (
        <Box ref={combinedRef} mt={4} p={2} textAlign="center" {...props}>
            <div ref={sectionRef}>
                <motion.div
                    initial="hidden"
                    animate={sectionInView ? "visible" : "hidden"}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Typography variant="h3" component="h2" gutterBottom>
                        Tools of the Trade
                    </Typography>
                    <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={3}>
                        These are the cloud providers I frequently work with
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {clouds.map((tool, index) => (
                            <Grid item xs={6} sm={2} md={1} key={index}>
                                <motion.div
                                    initial="hidden"
                                    animate={sectionInView ? "visible" : "hidden"}
                                    variants={fadeInVariants}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
                                >
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
                    <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={3}>
                        Programming Languages I have experience with
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {languages.map((tool, index) => (
                            <Grid item xs={6} sm={4} md={1.5} key={index}>
                                <motion.div
                                    initial="hidden"
                                    animate={sectionInView ? "visible" : "hidden"}
                                    variants={fadeInVariants}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
                                >
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
                    <Typography variant="body1" gutterBottom color={'whitesmoke'} marginBottom={3}>
                        Technologies I have used extensively
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {technologies.map((tool, index) => (
                            <Grid item xs={6} sm={4} md={1.5} key={index}>
                                <motion.div
                                    initial="hidden"
                                    animate={sectionInView ? "visible" : "hidden"}
                                    variants={fadeInVariants}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
                                >
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
            </div>
        </Box>
    );
});

export default ToolsComponent;
