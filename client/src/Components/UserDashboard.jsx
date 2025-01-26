import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
} from "@mui/material";

const UserDashboard = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [error, setError] = useState(""); // For handling errors

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        // Get the token and userId from localStorage
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("User not authenticated.");
          return;
        }

        // Fetch loan applications from the API using the userId
        const response = await fetch(
          `http://192.168.159.92:5000/api/user/loan-details/${userId}`, // Use user-specific ID
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Include the token in the header for authorization
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLoanApplications(data.applications || []);
        } else {
          setError("Failed to fetch loan applications.");
        }
      } catch (error) {
        console.error("Error fetching loan applications:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchLoanApplications();
  }, []); // Empty dependency array to run once after initial render

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Your Loan Applications
      </Typography>

      {error && (
        <Typography variant="body1" align="center" color="error" mt={4}>
          {error}
        </Typography>
      )}

      {loanApplications.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Subcategory</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Loan Amount</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanApplications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell>{loan.category}</TableCell>
                    <TableCell>{loan.subcategory}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            loan.status === "Approved"
                              ? "green"
                              : loan.status === "Rejected"
                              ? "red"
                              : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {loan.status}
                      </Typography>
                    </TableCell>
                    <TableCell>PKR {loan.loanAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => alert(`Details for Loan ID: ${loan.id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={loanApplications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary" mt={4}>
          No loan applications found.
        </Typography>
      )}
    </Box>
  );
};

export default UserDashboard;
