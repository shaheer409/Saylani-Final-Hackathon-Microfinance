import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Calculator from "./Calculator";

const categories = [
  {
    title: "Wedding Loans",
    description: "Valima, Furniture, Valima Food, Jahez",
    maxLoan: "PKR 5 Lakh",
    period: "3 years",
    path: "wedding-loans",
  },
  {
    title: "Home Construction Loans",
    description: "Structure, Finishing, Loan",
    maxLoan: "PKR 10 Lakh",
    period: "5 years",
    path: "home-construction-loans",
  },
  {
    title: "Business Startup Loans",
    description: "Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery",
    maxLoan: "PKR 10 Lakh",
    period: "5 years",
    path: "business-startup-loans",
  },
  {
    title: "Education Loans",
    description: "University Fees, Child Fees Loan",
    maxLoan: "Based on requirement",
    period: "4 years",
    path: "education-loans",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#eaf2f8", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "400px", sm: "500px" },
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?finance")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box sx={{ textAlign: "center", zIndex: 1, px: 3 }}>
          <Typography variant="h2" sx={{ fontWeight: 800 }}>
            Saylani Microfinance
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Empowering Your Financial Future
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/loan-request")}
            sx={{ mt: 3, px: 6, py: 1.5, fontSize: "1.2rem", fontWeight: 700 }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>

      {/* Loan Categories Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 4 }}>
          Select Your Loan Option
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Max Loan:</strong> {category.maxLoan}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Loan Period:</strong> {category.period}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={() => navigate(`/loan-details/${category.path}`)}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Calculator Section */}
      <Box sx={{ backgroundColor: "#d6eaf8", py: 6 }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 4 }}>
            Loan Estimator
          </Typography>
          <Box sx={{ maxWidth: "600px", mx: "auto" }}>
            <Calculator />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
