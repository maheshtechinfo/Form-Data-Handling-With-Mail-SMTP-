import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function EmployeeList() {

  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch data (no setLoading here → no warning)
  useEffect(() => {
    getEmployees().then(res => setList(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {

      deleteEmployee(id).then(() => {

        // ✅ instant UI update
        setList(prev => prev.filter(emp => emp.id !== id));

        // ✅ message
        setMsg("Employee Deleted Successfully ❌");

        setTimeout(() => setMsg(""), 2000);
      });
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center text-primary mb-4">Employee Records</h2>

      {/* Message */}
      {msg && (
        <div className="alert alert-danger text-center p-2">
          {msg}
        </div>
      )}

      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => navigate(`/view/${emp.id}`)}
                >
                  View
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit/${emp.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <button
          className="btn btn-success"
          onClick={() => navigate("/")}
        >
          Add New
        </button>
      </div>

    </div>
  );
}

export default EmployeeList;