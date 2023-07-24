import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Advisors from "./studentadvisor/StudentAdvisors";
import Login from "./containers/login/login";

function App() {
  
    return (
      <div>
        <Routes>
        <Route exact path="/" element={<Login />} />
          <Route exact path="/advisors" element={<Advisors />} />          
        </Routes>
      </div>
    );
  
}

export default App;
