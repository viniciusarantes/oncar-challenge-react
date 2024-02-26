import "./VehicleList.css";
import "../public/loader.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useRequest from "../hooks/useRequest";

import VehicleInterface from "../@types/vehicle";
import VehicleListCard from "./VehicleListCard";
import VehicleForm from "./VehicleForm";
import Vehicle from "../@types/vehicle";

const VehicleList = () => {
  const url = import.meta.env.VITE_API_URL + "/vehicles";
  const {
    data: vehicles,
    loading,
    createVehicle,
    deleteVehicle,
  } = useRequest(url);

  const [isInsert, setIsInsert] = useState<boolean>(false);

  const handleCreateVehicle = (payload: Vehicle) => {
    createVehicle(payload);
  };

  console.log(url);

  return (
    <div className="container">
      <h1 className="title-list">Lista de Veículos</h1>
      <button className="btn btn-new-vehicle" onClick={() => setIsInsert(true)}>
        <FontAwesomeIcon icon={faPlus} /> <span>Novo veículo</span>
      </button>
      {isInsert && (
        <VehicleForm
          setIsInsert={setIsInsert}
          createVehicle={handleCreateVehicle}
          loading={loading}
        />
      )}
      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
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
              deleteVehicle={deleteVehicle}
            />
          ))}
      </div>
      {!loading && vehicles && vehicles.length === 0 && (
        <span className="empty-list">Nenhum carro encontrado.</span>
      )}
    </div>
  );
};

export default VehicleList;
