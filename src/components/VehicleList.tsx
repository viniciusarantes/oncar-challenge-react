import "./VehicleList.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useRequest from "../hooks/useRequest";

import VehicleInterface from "../interfaces/Vehicle";
import VehicleListCard from "./VehicleListCard";
import VehicleForm from "./VehicleForm";

const VehicleList = () => {
  const url = "http://localhost:3000/vehicles";
  const { data: vehicles } = useRequest(url);

  const [isInsert, setIsInsert] = useState<boolean>(false);

  return (
    <div className="container">
      <h1 className="title-list">Lista de Veículos</h1>
      <button className="btn btn-new-vehicle" onClick={() => setIsInsert(true)}>
        <FontAwesomeIcon icon={faPlus} /> <span>Novo veículo</span>
      </button>
      {isInsert && <VehicleForm setIsInsert={setIsInsert} />}
      <div className="vehicle-list">
        {vehicles &&
          vehicles.map((vehicle: VehicleInterface) => (
            <VehicleListCard
              key={vehicle.id}
              id={vehicle.id}
              model={vehicle.model}
              brand={vehicle.brand}
              color={vehicle.color}
              year={vehicle.year}
              km={vehicle.km}
            />
          ))}
        {vehicles && vehicles.length === 0 && (
          <span className="empty-list">Nenhum carro registrado.</span>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
