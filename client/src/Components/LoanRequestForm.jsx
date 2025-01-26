import React, { useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { saveAs } from "file-saver"; // For downloading the slip as image

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

const LoanRequestForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    loanAmount: "",
    guarantor1: "",
    guarantor2: "",
  });

  const [errors, setErrors] = useState({});
  const [slipData, setSlipData] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field being updated
  };

  // Form validation
  const validate = () => {
    let newErrors = {};
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.subcategory) newErrors.subcategory = "Subcategory is required.";
    if (!formData.loanAmount || formData.loanAmount <= 0)
      newErrors.loanAmount = "Please enter a valid loan amount.";
    if (!formData.guarantor1) newErrors.guarantor1 = "Guarantor 1 is required.";
    if (!formData.guarantor2) newErrors.guarantor2 = "Guarantor 2 is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const token = localStorage.getItem("authToken"); // Get the auth token from localStorage
      const userId = localStorage.getItem("userId"); // Get the userId from localStorage
  
      if (!token || !userId) {
        alert("User is not authenticated. Please log in again.");
        return;
      }
  
      // Prepare the API request payload
      const raw = JSON.stringify({
        userId,
        category: formData.category,
        subcategory: formData.subcategory,
        amount: formData.loanAmount,
      });
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("http://192.168.159.92:5000/api/user/loan", requestOptions);
      const result = await response.json();
      console.log(result.loan._id)
  
      if (response.ok) {
        // Fetch the slip using the token received in the loan request result
        const slipToken = result.loan._id;
        const slipRequestOptions = {
          method: "GET",
          redirect: "follow",
        };
  
        const slipResponse = await fetch(`http://192.168.159.92:5000/api/user/slip/${slipToken}`, slipRequestOptions);
        const slipResult = await slipResponse.json();
        if (slipResponse.ok) {
          // Prepare slip data with appointment details and QR code
          const slipDetails = {
            token: slipResult.token || 'Unknown Token', // Fallback if token is missing
            appointmentDate: slipResult.appointmentDetails?.date || 'No date available', // Safely accessing appointment date
            appointmentTime: slipResult.appointmentDetails?.time || 'No time available', // Safely accessing appointment time
            officeLocation: slipResult.appointmentDetails?.location || 'No location available', // Safely accessing appointment location
            qrCode: slipResult.qrCode || '', // If no QR code is available, an empty string as fallback
          };
  
          setSlipData(slipDetails); // Set slip data to show the generated slip
          alert("Loan Request Submitted Successfully!");
        } else {
          alert("Error fetching loan slip. Please try again.");
          console.error(slipResult);
        }
      } else {
        alert("Error submitting loan request. Please try again.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  // Generate a downloadable image of the slip
  const downloadSlip = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    // Set canvas size based on content
    const canvasWidth = 400; // Adjust based on the length of the slip data
    const canvasHeight = 300 + 128; // Allow space for QR code image (128px height)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  console.log("slipData",slipData)
    // Draw appointment details on canvas
    context.font = "16px Arial";
    context.fillText(`Token Number: ${slipData.token}`, 10, 20);
    context.fillText(`Date: ${slipData.appointmentDate}`, 10, 40);
    context.fillText(`Time: ${slipData.appointmentTime}`, 10, 60);
    context.fillText(`Location: ${slipData.officeLocation}`, 10, 80);
  
    // Create the image for QR Code
    const img = new Image();
    img.src = slipData.qrCode; // The Base64 QR code from your response
  
    img.onload = () => {
      // Draw the QR Code on the canvas
      context.drawImage(img, 10, 100);
  
      // Convert canvas to image blob and save as PNG file
      canvas.toBlob((blob) => {
        saveAs(blob, `Loan_Slip_${slipData.token}.png`);
      }, "image/png");
    };
  
    img.onerror = (error) => {
      console.error("Error loading QR code image", error);
      alert("Failed to load QR code image for the slip.");
    };
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: "12px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Loan Request Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Loan Category */}
              <Grid item xs={12}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.category}
                  helperText={errors.category}
                >
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Home">Home Construction</MenuItem>
                  <MenuItem value="Business">Business Startup</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                </TextField>
              </Grid>

              {/* Subcategory */}
              <Grid item xs={12}>
                <TextField
                  label="Subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.subcategory}
                  helperText={errors.subcategory}
                />
              </Grid>

              {/* Loan Amount */}
              <Grid item xs={12}>
                <TextField
                  label="Loan Amount (PKR)"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.loanAmount}
                  helperText={errors.loanAmount}
                />
              </Grid>

              {/* Guarantor 1 */}
              <Grid item xs={12}>
                <TextField
                  label="Guarantor 1 Name"
                  name="guarantor1"
                  value={formData.guarantor1}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.guarantor1}
                  helperText={errors.guarantor1}
                />
              </Grid>

              {/* Guarantor 2 */}
              <Grid item xs={12}>
                <TextField
                  label="Guarantor 2 Name"
                  name="guarantor2"
                  value={formData.guarantor2}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.guarantor2}
                  helperText={errors.guarantor2}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Submit Loan Request
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Display Slip Data */}
          {slipData && (
            <Box mt={4}>
              <Typography variant="h6" align="center" gutterBottom>
                Slip Details
              </Typography>
              <Typography variant="body1" align="center">
                Token Number: {slipData.token}
                <br />
                Date: {slipData.appointmentDate}
                <br />
                Time: {slipData.appointmentTime}
                <br />
                Location: {slipData.officeLocation}
              </Typography>
              <Box mt={2} align="center">
                <img
                  src={slipData.qrCode}
                  alt="QR Code"
                  width="128"
                  height="128"
                />
              </Box>
              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={downloadSlip}
                >
                  Download Slip as Image
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoanRequestForm;
