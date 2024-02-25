import { createContext, useState } from "react";
import { AlertContextType, AlertMessage } from "../@types/alert";

export const AlertContext = createContext<AlertContextType | null>(null);

const AlertContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<AlertMessage>({
    status: "",
    message: "",
  });

  const createMessage = (message: AlertMessage) => {
    setMessage(message);
  };

  return (
    <AlertContext.Provider value={{ message, createMessage }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
