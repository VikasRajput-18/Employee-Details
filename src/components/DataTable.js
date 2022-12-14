import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [search, setSearch] = useState("");
  const [managerID, setManagerID] = useState([]);
  const [managers, setManagers] = useState([]);
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

  let rows = [...emplyeeData];

  rows = rows.filter((row) => {
    if (search === "") {
      return row;
    } else if (
      row.first_name.toLowerCase().includes(search.toLowerCase()) ||
      row.last_name.toLowerCase().includes(search.toLowerCase())
    ) {
      return row;
    }
  });
  let managerId = emplyeeData.map((manager) => {
    return manager.manager_id;
  });

  const uniqueManagerID = [...new Set(managerId)];

  const getManagerID = (id) => {
    let selected = emplyeeData[id],
      length = emplyeeData.length,
      selectedManagerId = selected.manager_id,
      emplyeeList = [];

    let i = 0;

    for (; i < length; i++) {
      if (selectedManagerId === (emplyeeData[i] || {}).manager_id) {
        emplyeeList.push(emplyeeData[i]);
      }

      setManagers(emplyeeList);
    }
  };


  let uni = managerID.map((man) => man.manager_id);
  uni = [...new Set(uni)];

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center text-primary my-5">Employess</h1>

        <div
          style={{ height: 430, width: "100%" }}
          className="bg-light rounded"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Employess..."
            style={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      </Container>

      <Container className="my-5">
        <h1
          className="text-center text-white bg-danger"
          style={{ color: "#333" }}
        >
          Managers
        </h1>
        <div>
          {uniqueManagerID.map((manID, i) => {
            return (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  onClick={() => getManagerID(i)}
                >
                  <Typography>Manager : {manID}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {managers.map((manager, i) => {
                    return (
                      <div key={i}>
                        <Table>
                          <thead className="table-info">
                            <tr>
                              <th>Field</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-success">
                              <td>First Name</td>
                              <td>{manager?.first_name}</td>
                            </tr>
                            <tr className="table-light">
                              <td>Last Name</td>
                              <td>{manager?.last_name}</td>
                            </tr>
                            <tr className="table-warning">
                              <td>Date of Birth</td>
                              <td>{manager?.date_of_birth}</td>
                            </tr>
                            <tr className="table-info">
                              <td>Address</td>
                              <td>{manager?.address}</td>
                            </tr>
                            <tr className="table-danger">
                              <td>Date of Joining</td>
                              <td>{manager?.date_of_joining}</td>
                            </tr>
                            <tr className="table-primary">
                              <td>Salary</td>
                              <td>${manager?.salary}</td>
                            </tr>
                            <tr className="table-secondary">
                              <td>Designation</td>
                              <td>{manager?.designation}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </Container>
    </>
  );
}
