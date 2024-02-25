import { useEffect, useState } from "react";
import Vehicle from "../@types/vehicle";
import useAlertContext from "./useAlertContext";
import { AlertContextType } from "../@types/alert";

const useRequest = (url: string) => {
  const [data, setData] = useState<Vehicle[]>();
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [loading, setLoading] = useState<boolean>(false);
  const [callFetch, setCallFetch] = useState<boolean>(false);

  const { createMessage } = useAlertContext() as AlertContextType;

  const getHttpOptions = () => {
    return {
      method: "",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  };

  const createVehicle = (payload: Vehicle) => {
    const sendRequest = async () => {
      try {
        setLoading(true);
        let httpOptions = {
          ...getHttpOptions(),
          body: JSON.stringify(payload),
        };
        httpOptions.method = "POST";
        await fetch(url, httpOptions);
        createMessage({
          status: "success",
          message: "Veículo criado com sucesso!",
        });
        setLoading(false);
        setCallFetch(true);
      } catch (error) {
        console.log("Erro aqui", error);
        createMessage({ status: "error", message: "Falha ao criar veículo" });
        setLoading(false);
        console.log(error);
      }
    };
    sendRequest();
  };

  const deleteVehicle = (id?: number) => {
    const sendRequest = async () => {
      try {
        setLoading(true);
        let httpOptions = { ...getHttpOptions() };
        httpOptions.method = "DELETE";
        const parsedUrl = `${url}/${id}`;
        await fetch(parsedUrl, httpOptions);
        createMessage({
          status: "success",
          message: "Veículo deletado com sucesso!",
        });
        setLoading(false);
        setCallFetch(true);
      } catch (error) {
        createMessage({ status: "error", message: "Falha ao deletar veículo" });
        setLoading(false);
        console.log(error);
      }
    };
    sendRequest();
  };

  useEffect(() => {
    const getVehicles = async () => {
      try {
        setLoading(true);
        let httpOptions = { ...getHttpOptions() };
        httpOptions.method = "GET";
        const response = await fetch(url, httpOptions);
        const json = await response.json();
        setData(json);
        setVehicle(json);
        setLoading(false);
        setCallFetch(false);
      } catch (error) {
        createMessage({
          status: "error",
          message: "Falha ao consultar veículo",
        });
        setLoading(false);
        setData([]);
        console.log(error);
      }
    };
    getVehicles();
  }, [url, callFetch]);

  return { data, vehicle, loading, createVehicle, deleteVehicle };
};

export default useRequest;
