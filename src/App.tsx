import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<VehicleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
