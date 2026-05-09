import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeView from "./components/EmployeeView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/show" element={<EmployeeList />} />
        <Route path="/view/:id" element={<EmployeeView />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;