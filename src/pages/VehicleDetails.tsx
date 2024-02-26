import "./VehicleDetails.css";
import "../public/loader.css";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import useRequest from "../hooks/useRequest";
import { useState } from "react";
import useAlertContext from "../hooks/useAlertContext";
import { AlertContextType } from "../@types/alert";

interface SimulationProps {
  score: number;
  approval: boolean;
  message: string;
}

const VehicleDetails = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const { vehicle, loading } = useRequest(`${url}/vehicles/${id}`);

  const { createMessage } = useAlertContext() as AlertContextType;

  const [simulation, setSimulation] = useState<SimulationProps>();
  const [loadingSim, setLoadingSim] = useState<boolean>(false);

  const handleSimulate = () => {
    const sendRequest = async () => {
      try {
        setLoadingSim(true);
        const httpOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const simulateUrl = `${url}/simulation`;
        const response = await fetch(simulateUrl, httpOptions);
        const json = await response.json();
        setSimulation(json);
        setLoadingSim(false);
      } catch (err) {
        createMessage({
          status: "error",
          message: "Falha ao solicitar a simulação",
        });
        setLoadingSim(false);
        console.log(err);
      }
    };
    sendRequest();
  };

  return (
    <div className="container">
      <h1 className="title-details">Detalhes do veículo</h1>
      <Link to="/" className="btn btn-back">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Voltar</span>
      </Link>

      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}

      {!loading && (
        <div className="details">
          <div className="details-title">
            {vehicle && vehicle.brand} {vehicle && vehicle.model}
          </div>
          <div className="details-row"></div>
          <div className="details-row">
            <span className="label">Marca</span>
            <span>{vehicle && vehicle.brand}</span>
          </div>
          <div className="details-row">
            <span className="label">Modelo</span>
            <span>{vehicle && vehicle.model}</span>
          </div>
          <div className="details-row">
            <span className="label">Ano</span>
            <span>{vehicle && vehicle.year}</span>
          </div>
          <div className="details-row">
            <span className="label">Cor</span>
            <span>{vehicle && vehicle.color}</span>
          </div>
          <div className="details-row">
            <span className="label">Km</span>
            <span>{vehicle && vehicle.km.toLocaleString()}</span>
          </div>
          <div className="details-footer">
            <button
              className={`btn ${loading && "btn-disabled"}`}
              onClick={handleSimulate}
            >
              {loadingSim ? "Solicitando..." : "Solicitar simulação"}
            </button>
          </div>
        </div>
      )}

      {simulation && (
        <div className="simulation-result">
          <div className="score">
            <span className="label">Score</span>
            <span className="value">{simulation && simulation.score}</span>
          </div>
          <div className="message">
            <span
              className={`value ${
                simulation.approval ? "approval" : "disapproval"
              }`}
            >
              {simulation && simulation.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
