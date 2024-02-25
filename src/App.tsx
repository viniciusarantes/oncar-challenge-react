import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import Alert from "./components/Alert";
import AlertContextProvider from "./context/AlertContext";

function App() {
  return (
    <AlertContextProvider>
      <BrowserRouter>
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </AlertContextProvider>
  );
}

export default App;
