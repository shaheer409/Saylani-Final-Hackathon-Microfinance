import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
});

const Registration = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For handling error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set up headers and request options
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      cnic: formData.cnic,
      email: formData.email,
      name: formData.name,
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
        "http://192.168.159.92:5000/api/user/register", // Updated API URL
        requestOptions
      );
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Registration Successful");
      } else {
        setError(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#1976d2", // Blue background
          minHeight: "100vh", // Full screen height
          display: "flex", // Flexbox for centering
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: "#ffffff", // White background for the form
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#1976d2" }}
            >
              Register
            </Typography>
            <Typography
              variant="body1"
              align="center"
              paragraph
              sx={{ color: "#666" }}
            >
              Create an account to access exclusive features.
            </Typography>
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="CNIC"
                    name="cnic"
                    fullWidth
                    variant="outlined"
                    value={formData.cnic}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    fullWidth
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                      padding: "12px 0",
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: 3, color: "white" }}
          >
            Already have an account?{" "}
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 600 }}
              onClick={() => alert("Navigate to Login Page")}
            >
              Login
            </Button>
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Registration;
