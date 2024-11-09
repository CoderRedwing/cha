import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        let newErrors = {};
        
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await axios.post('/api/user/login', { email, password }, config);
                if (response.status === 200) {
                    alert('Login Successfully!');
                    history.push('/chat');
                } else {
                    alert('Login failed. Please try again.');
                }
                
            } catch (error) {
                console.error('Error during login:', error);
                if (error.response && error.response.data.message) {
                    setErrors({ general: error.response.data.message });
                } else {
                    setErrors({ general: 'An error occurred during login.' });
                }
            } finally {
                setLoading(false);
            }
            
        }
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: 3,
                borderRadius: 3,
                backgroundColor: 'white'
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}></Typography>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                placeholder="Enter Your Email Address"
            />

            <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                placeholder="Enter Password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handlePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{ marginTop: 2, padding: '10px 0', fontWeight: 'bold' }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Button
                variant="contained"
                color="red"
                fullWidth
                onClick={() => {
                    setEmail("guest@gmail.com");
                    setPassword("123456");
                }}
                sx={{ marginTop: 2, padding: '10px 0', fontWeight: 'bold' }}
            >
                Get Guest User Login
            </Button>
        </Box>
    );
};

export default Login;
