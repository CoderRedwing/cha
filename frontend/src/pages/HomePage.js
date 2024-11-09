import React, { useState } from "react";
import { Container, Box, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const HomePage = () => {
    
    const [value, setValue] = useState("1");

    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl">
            
            <Box component="section" sx={{
                p: 2,
                m: 3,
                border: '1px solid',
                backgroundColor: 'white',
                textAlign: 'center',
                width: '40%',
                borderRadius: '5px'
            }}>
                <Typography 
                    variant="h4" 
                    sx={{
                        fontFamily: 'Work Sans, sans-serif',
                        color: 'black',
                    }}
                >
                    Message-Chat-App
                </Typography>
            </Box>

            
            <Box component="section" sx={{
                p: 2,
                m: 3,
                border: '1px solid',
                backgroundColor: 'white',
                width: '40%',
                borderRadius: '5px',
            }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 0, borderColor: 'driver' }}>
                        <TabList onChange={handleChange} aria-label="Authentication tabs">
                            <Tab label="Login" value="1" sx={{ width: '50%',color: 'black', fontWeight: 'bold' }} />
                            <Tab label="Sign Up" value="2" sx={{ width: '50%', color: 'black', fontWeight: 'bold' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Login /> 
                    </TabPanel>
                    <TabPanel value="2">
                        <Signup /> 
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
};

export default HomePage;
