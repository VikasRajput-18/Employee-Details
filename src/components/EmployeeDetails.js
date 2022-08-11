import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

export default function BasicTable() {
  const [table, setTable] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
      );
      let data = await res.json();
      const newData = data.filter((item) => item.id === id);
      setTable(newData);
    };
    fetchData();
  }, []);

  return (
    <Container className="my-5">
    <h1 className="text-center text-danger my-5">Employee Details</h1>

      <Table bordered hover>
        <thead className="table-info">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-success">
            <td>First Name</td>
            <td>{table[0]?.first_name}</td>
          </tr>
          <tr className="table-light">
            <td>Last Name</td>
            <td>{table[0]?.last_name}</td>
          </tr>
          <tr className="table-warning">
            <td>Date of Birth</td>
            <td>{table[0]?.date_of_birth}</td>
          </tr>
          <tr className="table-info">
            <td>Address</td>
            <td>{table[0]?.address}</td>
          </tr>
          <tr className="table-danger">
            <td>Date of Joining</td>
            <td>{table[0]?.date_of_joining}</td>
          </tr>
          <tr className="table-primary">
            <td>Salary</td>
            <td>${table[0]?.salary}</td>
          </tr>
          <tr className="table-secondary">
            <td>Designation</td>
            <td>{table[0]?.designation}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
