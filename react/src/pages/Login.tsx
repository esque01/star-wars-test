import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import APIClient from '../data/APIClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


export default function Login() {

    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
        else {
            navigate("/landing");
        }
    }, [isAuthenticated, navigate]);
    

    const onSubmit = async() => {
        const email = "testuser@email.com";
        const password = "password";

        const response = await APIClient.post('/login', { email, password  }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            localStorage.setItem("jwt", response.data);
            setIsAuthenticated(true);
        }
    }
    
  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
        sx={{ 
            backgroundColor: "white", 
            height: "600px", 
            width: "600px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            borderRadius: 5,
            boxShadow: 5,
        }}>
            <Grid sx={{ display: "flex", flexDirection: "column", padding: "10px", width: "75%", textAlign: "center" }} rowGap={2}>
                <Grid size={12} pb={8}>
                    <Typography variant='h4'>Welcome back!</Typography>
                </Grid>
                <Grid size={12}>
                    <TextField fullWidth name='username' label="Username" value='testuser@email.com'></TextField>
                </Grid>
                <Grid size={12}>
                    <TextField fullWidth name='password' label="Password" type="password" value='password'></TextField>
                </Grid>
                <Grid size={12}>
                    <Button fullWidth variant='contained' onClick={onSubmit}>Login</Button>
                </Grid>
            </Grid>
    </Box>
    </Box>
  )
}