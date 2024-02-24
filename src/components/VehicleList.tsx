import "./VehicleList.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import CarInterface from "../interfaces/Vehicle";
import VehicleListCard from "./VehicleListCard";
import VehicleForm from "./VehicleForm";

const VehicleList = () => {
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const carList: CarInterface[] = [
    {
      id: 1,
      brand: "Chevrolet",
      model: "Onix",
      color: "Preto",
      year: 2015,
      km: 118000,
    },
    {
      id: 3,
      brand: "Fiat",
      model: "Argo",
      color: "Branco",
      year: 2020,
      km: 45000,
    },
  ];

  return (
    <div className="container">
      <h1 className="title-list">Lista de Veículos</h1>
      <button className="btn btn-new-car" onClick={() => setIsInsert(true)}>
        <FontAwesomeIcon icon={faPlus} /> <span>Novo veículo</span>
      </button>
      {isInsert && <VehicleForm setIsInsert={setIsInsert} />}
      <div className="car-list">
        {carList.map((car: CarInterface) => (
          <VehicleListCard
            id={car.id}
            model={car.model}
            brand={car.brand}
            color={car.color}
            year={car.year}
            km={car.km}
          />
        ))}
        {carList.length === 0 && (
          <span className="empty-list">Nenhum carro registrado.</span>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
