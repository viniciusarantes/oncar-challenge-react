import "./CarListCard.css";
import CarInterface from "../interfaces/CarInterface";

const CarListCard: React.FC<CarInterface> = ({
  id,
  brand,
  model,
  color,
  year,
  km,
}) => {
  console.log(id, brand);
  return (
    <div className="card">
      <div className="card-header">
        <span>{model}</span>
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
        <a href="#" className="details">
          Ver detalhes
        </a>
      </div>
    </div>
  );
};

export default CarListCard;
