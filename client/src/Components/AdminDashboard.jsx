import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({ city: "", country: "" });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/applications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredApplications = applications.filter((application) => {
    return (
      (filters.city === "" || application.city === filters.city) &&
      (filters.country === "" || application.country === filters.country)
    );
  });

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Filter Applications</h3>
      <div>
        <TextField
          label="City"
          variant="outlined"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Country"
          variant="outlined"
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        />
      </div>
      <h3>Loan Applications</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Guarantor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.category}</TableCell>
                <TableCell>{loan.subcategory}</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>{loan.loanAmount}</TableCell>
                <TableCell>{loan.guarantor}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => alert("View details here")}>View Details</Button>
                  <Button variant="contained" color="primary" style={{ marginLeft: "10px" }} onClick={() => alert("Approve/Reject loan")}>Approve/Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
