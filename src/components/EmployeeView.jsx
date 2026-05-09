import { useEffect, useState } from "react";
import { getEmployeeById } from "../services/EmployeeService";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeView() {

  const [emp, setEmp] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById(id).then(res => setEmp(res.data));
  }, [id]);

  return (
    <div className="container-fluid mt-3 px-2 text-center">

      <h3 className="text-primary mb-3">Employee Details</h3>

      <div style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped table-sm">
          
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Company</th>
              <th>Aadhaar</th>
              <th>PAN</th>
              <th>Address</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{emp?.name}</td>
              <td>{emp?.email}</td>
              <td>{emp?.mobile}</td>
              <td>{emp?.companyName}</td>
              <td>{emp?.aadhaar}</td>
              <td>{emp?.pan}</td>
              <td>{emp?.address}</td>
              <td>{emp?.position}</td>
              <td>{emp?.salary}</td>
              <td>{emp?.department}</td>
            </tr>
          </tbody>

        </table>
      </div>

      <div className="mt-3">
        <button className="btn btn-warning btn-sm me-2"
          onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </button>

        <button className="btn btn-secondary btn-sm"
          onClick={() => navigate("/show")}>
          Back
        </button>
      </div>

    </div>
  );
}

export default EmployeeView;