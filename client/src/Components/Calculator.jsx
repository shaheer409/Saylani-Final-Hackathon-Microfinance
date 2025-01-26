import React, { useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Paper,
  Alert,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Material-UI custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Custom blue
    },
    secondary: {
      main: "#f50057", // Custom pink
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const Calculator = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [deposit, setDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [calculatedLoan, setCalculatedLoan] = useState(null);
  const [error, setError] = useState("");

  // Real-time calculation logic
  const calculateLoan = () => {
    if (!category || !deposit || !loanPeriod) {
      setError("Please fill out all required fields to see the result.");
      setCalculatedLoan(null);
      return;
    }

    setError("");
    const maxLoan = category === "Wedding" ? 500000 : 1000000; // Example loan caps
    const estimatedLoan = maxLoan - Number(deposit);
    setCalculatedLoan({ estimatedLoan, loanPeriod });
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    calculateLoan(); // Trigger real-time updates
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: "12px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Loan Calculator
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Calculate your estimated loan based on your initial deposit and loan period.
          </Typography>
          <form>
            <Grid container spacing={3}>
              {/* Loan Category */}
              <Grid item xs={12}>
                <TextField
                  select
                  label="Category"
                  fullWidth
                  value={category}
                  onChange={handleInputChange(setCategory)}
                  required
                >
                  <MenuItem value="Wedding">Wedding Loans</MenuItem>
                  <MenuItem value="Home">Home Construction Loans</MenuItem>
                  <MenuItem value="Business">Business Startup Loans</MenuItem>
                  <MenuItem value="Education">Education Loans</MenuItem>
                </TextField>
              </Grid>

              {/* Subcategory */}
              <Grid item xs={12}>
                <TextField
                  label="Subcategory"
                  fullWidth
                  value={subcategory}
                  onChange={handleInputChange(setSubcategory)}
                  required
                />
              </Grid>

              {/* Initial Deposit */}
              <Grid item xs={12}>
                <TextField
                  label="Initial Deposit (PKR)"
                  type="number"
                  fullWidth
                  value={deposit}
                  onChange={handleInputChange(setDeposit)}
                  required
                />
              </Grid>

              {/* Loan Period */}
              <Grid item xs={12}>
                <TextField
                  label="Loan Period (Years)"
                  type="number"
                  fullWidth
                  value={loanPeriod}
                  onChange={handleInputChange(setLoanPeriod)}
                  required
                />
              </Grid>

              {/* Error Alert */}
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              {/* Loan Calculation Result */}
              {calculatedLoan && (
                <Grid item xs={12}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 2,
                      backgroundColor: "#f9f9f9",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Loan Details
                    </Typography>
                    <Typography variant="body1">
                      <strong>Estimated Loan:</strong> PKR{" "}
                      {calculatedLoan.estimatedLoan.toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Loan Period:</strong> {calculatedLoan.loanPeriod} years
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {/* Reset Button */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setCategory("");
                    setSubcategory("");
                    setDeposit("");
                    setLoanPeriod("");
                    setCalculatedLoan(null);
                    setError("");
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Calculator;
