import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Create a custom theme for the UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue color for primary actions
    },
    secondary: {
      main: "#f50057", // Pink color for secondary actions
    },
  },
});

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set up headers and request options
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://192.168.159.92:5000/api/user/login", // Updated API URL
        requestOptions
      );
      const result = await response.json();
      if (response.ok && result.message === "Login successful") {
        // Save token, userId, and isAdmin in localStorage
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("isAdmin", result.isAdmin);

        alert("Login Successful!");

        // Redirect to home page ("/") after successful login
        navigate("/"); // Navigate to the home page
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ padding: "12px 0" }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
