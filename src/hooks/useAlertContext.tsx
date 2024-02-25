import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    console.log("Context not found");
  }

  return context;
};

export default useAlertContext;
