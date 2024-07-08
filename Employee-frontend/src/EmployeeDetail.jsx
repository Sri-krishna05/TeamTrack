import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const status = 1;
  useEffect(() => {
    axios
      .get('http://localhost:8081/get/' + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  });
  const handleLogout = () => {
    axios
      .get('http://localhost:8081/logout')
      .then((res) => {
        navigate('/start');
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:8081/updatestatus/' + id, { status: 1 })
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/employee');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        {employee.image && (
          <img
            src={`http://localhost:8081/images/` + employee.image}
            alt=""
            className="empImg"
          />
        )}
        <div className="d-flex flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}</h3>
          <h3>Work: {employee.work}</h3>
          <h3>Status: {employee.status === 0 ? '⏳' : '✅'}</h3>
        </div>
        <button onClick={handleSubmit} className="btn btn-success">
          Work Finished
        </button>
        <br />
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
