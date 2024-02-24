import "./VehicleListCard.css";
import Vehicle from "../interfaces/Vehicle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const VehicleListCard: React.FC<Vehicle> = ({
  id,
  brand,
  model,
  color,
  year,
  km,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <span>{model}</span>
        <button className="btn-delete" title="Remover veículo">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="card-body">
        <div className="body-row"></div>
        <div className="body-row">
          <span className="label">Marca</span>
          <span>{brand}</span>
        </div>
        <div className="body-row">
          <span className="label">Ano</span>
          <span>{year}</span>
        </div>
        <div className="body-row">
          <span className="label">Cor</span>
          <span>{color}</span>
        </div>
        <div className="body-row">
          <span className="label">Km</span>
          <span>{km.toLocaleString()}</span>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`details/${id}`}>Ver detalhes</Link>
      </div>
    </div>
  );
};

export default VehicleListCard;
