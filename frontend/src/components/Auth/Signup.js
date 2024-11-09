import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file || !file.type.startsWith('image/')) {
            alert("Please upload a valid image file.");
            return;
        }

        setLoading(true);
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("cloud_name", "ajiteshyt");
        imageData.append("upload_preset", "chat-app");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/ajiteshyt/image/upload`, {
                method: "POST",
                body: imageData,
            });
            const data = await res.json();

            if (data.secure_url) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    profileImage: data.secure_url,
                }));
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            alert("Error uploading image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignup = async () => {
    let newErrors = {};

    // Validation for empty fields
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setLoading(true);
        try {
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const response = await axios.post('/api/user', formData, config);

            if (response.status === 201) {
                alert('User registered successfully!');
                history.push('/chat');  // Redirect to the chat page
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert('Error during signup. Please try again.');
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
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Sign Up</Typography>

            <TextField
                label="Name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.name)}
                helperText={errors.name}
                margin="normal"
                placeholder="Enter Your Name"
            />

            <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                placeholder="Enter Your Email Address"
            />

            <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.password)}
                helperText={errors.password}
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

            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                margin="normal"
                placeholder="Confirm Password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleConfirmPasswordVisibility} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Typography variant="body1" sx={{ mt: 2 }}>Upload your Picture</Typography>
            <Button
                variant="outlined"
                component="label"
                sx={{
                    width: '100%',
                    marginTop: 1,
                    marginBottom: 2,
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Choose file'}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </Button>
            {formData.profileImage && (
                <img src={formData.profileImage} alt="Uploaded Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignup}
                sx={{ marginTop: 2, padding: '10px 0', fontWeight: 'bold' }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
        </Box>
    );
};

export default Signup;
