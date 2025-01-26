import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme for the UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const LoanDetails = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // Handle dialog open/close
  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogContent("");
  };

  const cards = [
    {
      title: "Loan Information",
      content: `Learn about the loan amount, interest rates, repayment plans, and other important details for ${category.replace("-", " ")} loans. This category offers customized terms designed to suit your specific financial needs.`,
      buttonLabel: "Apply Now",
      buttonAction: () => navigate(`/loan-request`),
    },
    {
      title: "Loan Requirements",
      content: `Find out the eligibility criteria and documentation required for the ${category.replace("-", " ")} loan. Ensure you meet the conditions to start the application process smoothly.`,
      buttonLabel: "View Requirements",
      buttonAction: () =>
        handleOpenDialog(
          `Eligibility and documentation details for ${category.replace("-", " ")} loans go here. Customize this text to show the relevant information.`
        ),
    },
    {
      title: "Loan Benefits",
      content: `Explore the advantages of taking a ${category.replace("-", " ")} loan. From flexible repayment plans to low interest rates, discover how this loan can help you achieve your goals.`,
      buttonLabel: "Learn More",
      buttonAction: () =>
        handleOpenDialog(
          `Detailed benefits of ${category.replace("-", " ")} loans go here. Customize this text to highlight the key features.`
        ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>
            {category.replace("-", " ").toUpperCase()} Loan Details
          </Typography>
          <Typography variant="body1" paragraph>
            Explore the details, terms, and conditions for {category.replace("-", " ")} loans.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {card.content}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="contained"
                  color={index === 1 ? "secondary" : "primary"}
                  fullWidth
                  onClick={card.buttonAction}
                >
                  {card.buttonLabel}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>More Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{dialogContent}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default LoanDetails;
