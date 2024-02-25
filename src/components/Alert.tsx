import { useEffect } from "react";
import { AlertContextType } from "../@types/alert";
import useAlertContext from "../hooks/useAlertContext";
import "./Alert.css";

const Alert = () => {
  const { message, createMessage } = useAlertContext() as AlertContextType;

  const clearMessage = () => {
    if (message.message !== "") {
      createMessage({ status: "", message: "" });
    }
  };

  useEffect(() => {
    if (message.message !== "") {
      const timer = setTimeout(() => {
        clearMessage();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`alert ${message && message.status}`}
      onClick={clearMessage}
    >
      <p>{message && message.message}</p>
    </div>
  );
};

export default Alert;
