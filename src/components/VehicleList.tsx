import "./VehicleList.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useRequest from "../hooks/useRequest";

import CarInterface from "../interfaces/Vehicle";
import VehicleListCard from "./VehicleListCard";
import VehicleForm from "./VehicleForm";

const VehicleList = () => {
  const url = "http://localhost:3000/vehicles";
  const { data: vehicles } = useRequest(url);

  const [isInsert, setIsInsert] = useState<boolean>(false);

  return (
    <div className="container">
      <h1 className="title-list">Lista de Veículos</h1>
      <button className="btn btn-new-car" onClick={() => setIsInsert(true)}>
        <FontAwesomeIcon icon={faPlus} /> <span>Novo veículo</span>
      </button>
      {isInsert && <VehicleForm setIsInsert={setIsInsert} />}
      <div className="car-list">
        {vehicles &&
          vehicles.map((car: CarInterface) => (
            <VehicleListCard
              key={car.id}
              id={car.id}
              model={car.model}
              brand={car.brand}
              color={car.color}
              year={car.year}
              km={car.km}
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
