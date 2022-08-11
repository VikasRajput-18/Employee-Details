import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "first_name", headerName: "First name", width: 120 },
  { field: "last_name", headerName: "Last name", width: 130 },
  {
    field: "date_of_birth",
    headerName: "Date of Birth",
    type: "number",
    width: 130,
  },

  { field: "address", headerName: "Address", width: 120 },
  {
    field: "date_of_joining",
    headerName: "Date of Joining",
    type: "number",
    width: 130,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    width: 130,
  },
  {
    field: "designation",
    headerName: "Designation",
    type: "number",
    width: 120,
  },
  {
    field: "details",
    headerName: "Details",
    width: 130,
    renderCell: (params) => (
      <Link to={`/employee/${params.id}`} className="text-decoration-none">
        Details
      </Link>
    ),
  },
];

export default function DataTable() {
  const [emplyeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const url =
      "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees";
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setEmployeeData(data);
    };
    fetchData();
  }, []);

  const rows = [...emplyeeData];

  return (
    <Container className="my-5">
      <h1 className="text-center text-primary my-5">Employess</h1>

      <div style={{ height: 430, width: "100%" }} className="bg-light rounded">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
