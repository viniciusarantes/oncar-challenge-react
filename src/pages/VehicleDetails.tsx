import "./VehicleDetails.css";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Vehicle from "../interfaces/Vehicle";

const VehicleDetails = () => {
  const { id } = useParams();
  let vehicle: Vehicle = {
    id: 3,
    brand: "Fiat",
    model: "Argo",
    color: "Branco",
    year: 2020,
    km: 45000,
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
          {vehicle.brand} {vehicle.model}
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
          <button className="btn">Solicitar simulação</button>
        </div>
      </div>

      <div className="simulation-result">
        <div className="score">
          <span className="label">Score</span>
          <span className="value">{id}</span>
        </div>
        <div className="message">
          <span className="label">Mensagem</span>
          <span className="value">Reprovado</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
