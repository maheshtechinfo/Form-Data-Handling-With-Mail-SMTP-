import { useState, useEffect } from "react";
import { createEmployee, updateEmployee, getEmployeeById } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeForm() {

  const [emp, setEmp] = useState({
    name: "",
    mobile: "",
    email: "",
    companyName: "",
    aadhaar: "",
    pan: "",
    address: "",
    position: "",
    salary: "",
    department: ""
  });

  const [msg, setMsg] = useState("");  
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then(res => setEmp(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    if (id) {
      updateEmployee(id, emp).then(() => {
        setMsg("Employee Updated Successfully ✅");
        setTimeout(() => navigate("/show"), 800); // slight delay to show message
      });
    } else {
      createEmployee(emp).then(() => {
        setMsg("Employee Saved Successfully ✅");
        setTimeout(() => navigate("/show"), 800);
      });
    }
  };

  return (
    <div className="container-fluid mt-3 px-2">

      <h3 className="text-center text-primary mb-3">
        {id ? "Update Employee" : "Employee Registration"}
      </h3>

      {/* ✅ Success Message */}
      {msg && (
        <div className="alert alert-success text-center p-2">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-2 col-md-8 mx-auto">

        {/* Row 1 */}
        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="name" value={emp.name}
            onChange={handleChange} placeholder="Name" />
        </div>

        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="mobile" value={emp.mobile}
            onChange={handleChange} placeholder="Mobile" />
        </div>

        {/* Row 2 */}
        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="email" value={emp.email}
            onChange={handleChange} placeholder="Email" />
        </div>

        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="companyName" value={emp.companyName}
            onChange={handleChange} placeholder="Company" />
        </div>

        {/* Row 3 */}
        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="aadhaar" value={emp.aadhaar}
            onChange={handleChange} placeholder="Aadhaar" />
        </div>

        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="pan" value={emp.pan}
            onChange={handleChange} placeholder="PAN" />
        </div>

        {/* Row 4 */}
        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="address" value={emp.address}
            onChange={handleChange} placeholder="Address" />
        </div>

        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="position" value={emp.position}
            onChange={handleChange} placeholder="Position" />
        </div>

        {/* Row 5 */}
        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="salary" value={emp.salary}
            onChange={handleChange} placeholder="Salary" />
        </div>

        <div className="col-md-6">
          <input className="form-control form-control-sm"
            name="department" value={emp.department}
            onChange={handleChange} placeholder="Department" />
        </div>

        {/* Buttons */}
        <div className="text-center mt-3">
          <button
            className="btn btn-primary btn-sm me-2"
            disabled={loading}  // ✅ disable while saving
          >
            {loading ? "Please wait..." : (id ? "Update" : "Save")}
          </button>

          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => navigate("/show")}
          >
            View Records
          </button>
        </div>

      </form>

    </div>
  );
}

export default EmployeeForm;