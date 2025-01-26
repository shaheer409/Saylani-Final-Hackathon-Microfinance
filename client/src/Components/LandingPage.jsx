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
    description: "Subcategories: Valima, Furniture, Valima Food, Jahez",
    maxLoan: "PKR 5 Lakh",
    period: "3 years",
    path: "wedding-loans",
  },
  {
    title: "Home Construction Loans",
    description: "Subcategories: Structure, Finishing, Loan",
    maxLoan: "PKR 10 Lakh",
    period: "5 years",
    path: "home-construction-loans",
  },
  {
    title: "Business Startup Loans",
    description:
      "Subcategories: Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery",
    maxLoan: "PKR 10 Lakh",
    period: "5 years",
    path: "business-startup-loans",
  },
  {
    title: "Education Loans",
    description: "Subcategories: University Fees, Child Fees Loan",
    maxLoan: "Based on requirement",
    period: "4 years",
    path: "education-loans",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: "300px", sm: "400px" },
          backgroundImage:
            'url("https://source.unsplash.com/1600x900/?microfinance,business")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />
        <Box
          sx={{
            textAlign: "center",
            zIndex: 1,
            padding: "0 20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem" },
              fontWeight: 600,
            }}
            gutterBottom
          >
            Welcome to Saylani Microfinance
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" },
              marginBottom: "20px",
            }}
          >
            Empowering you to achieve your financial dreams
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/loan-request")}
            sx={{
              backgroundColor: "#ff7043",
              ":hover": { backgroundColor: "#ff5722" },
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Box>

      {/* Loan Categories Section */}
      <Container sx={{ paddingY: "50px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Select a Loan Category
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ marginBottom: "30px", color: "#555" }}
        >
          Choose from a range of loan options tailored to meet your specific
          financial needs.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  },
                  border: "none", // Removed unnecessary borders
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {category.description}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Max Loan:</strong> {category.maxLoan}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Loan Period:</strong> {category.period}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/loan-details/${category.path}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Calculator Section */}
      <Box sx={{ backgroundColor: "#ffffff", paddingY: "40px" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Loan Calculator
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ color: "#555", marginBottom: "30px" }}
          >
            Calculate your estimated loan payments and find the best plan for
            you.
          </Typography>
          <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
            <Calculator />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
