import { useEffect, useState } from "react";
import Vehicle from "../interfaces/Vehicle";

const useRequest = (url: string) => {
  const [data, setData] = useState<Vehicle[] | Vehicle>();
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [callFetch, setCallFetch] = useState<boolean>(false);

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
        setError("");
        setLoading(true);
        let httpOptions = {
          ...getHttpOptions(),
          body: JSON.stringify(payload),
        };
        httpOptions.method = "POST";
        const response = await fetch(url, httpOptions);
        await response.json();
        setLoading(false);
        setCallFetch(true);
      } catch (error) {
        setError(`Falha ao deletar veículo ${error}`);
        setLoading(false);
      }
    };
    sendRequest();
  };

  const deleteVehicle = (id: number) => {
    const sendRequest = async () => {
      try {
        setError("");
        setLoading(true);
        let httpOptions = { ...getHttpOptions() };
        httpOptions.method = "DELETE";
        const parsedUrl = `${url}/${id}`;
        const response = await fetch(parsedUrl, httpOptions);
        await response.json();
        setLoading(false);
        setCallFetch(true);
      } catch (error) {
        setError(`Falha ao deletar veículo ${error}`);
        setLoading(false);
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
      } catch (error) {
        setError(`Falha ao consultar veículos ${error}`);
        setLoading(false);
        setData([]);
      }
    };
    getVehicles();
  }, [url, callFetch]);

  return { data, vehicle, loading, error, createVehicle, deleteVehicle };
};

export default useRequest;
