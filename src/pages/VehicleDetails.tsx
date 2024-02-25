import "./VehicleDetails.css";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import useRequest from "../hooks/useRequest";
import { useState } from "react";

interface SimulationProps {
  score: number;
  approval: boolean;
  message: string;
}

const VehicleDetails = () => {
  const { id } = useParams();
  const url = "http://localhost:3000";
  const { vehicle } = useRequest(`${url}/vehicles/${id}`);

  const [simulation, setSimulation] = useState<SimulationProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSimulate = () => {
    const sendRequest = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (err) {
        setError(`Falha ao solicitar a simulação`);
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
            {loading ? "Solicitando..." : "Solicitar simulação"}
          </button>
        </div>
      </div>

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
