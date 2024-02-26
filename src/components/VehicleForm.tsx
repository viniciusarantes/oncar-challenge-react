import { AlertContextType } from "../@types/alert";
import Vehicle from "../@types/vehicle";
import useAlertContext from "../hooks/useAlertContext";
import "./VehicleForm.css";
import { FormEvent, useEffect, useState } from "react";

interface VehicleFormProps {
  setIsInsert: React.Dispatch<React.SetStateAction<boolean>>;
  createVehicle: (payload: Vehicle) => void;
  loading: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  setIsInsert,
  createVehicle,
  loading,
}) => {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [km, setKm] = useState<number>(0);

  const { message } = useAlertContext() as AlertContextType;

  const clearForm = () => {
    setBrand("");
    setModel("");
    setYear(0);
    setColor("");
    setKm(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: Vehicle = { brand, model, year, color, km };
    createVehicle(payload);
  };

  const handleCancel = () => {
    clearForm();
    setIsInsert(false);
  };

  useEffect(() => {
    if (!loading && message.status == "success") {
      clearForm();
    }
  }, [loading, message]);

  return (
    <div>
      <h3 className="form-title">Adicionar um novo veículo</h3>
      <form onSubmit={handleSubmit} className="form-vehicle">
        <label>
          <span>Marca</span>
          <input
            type="text"
            className="input-form"
            required
            disabled={loading}
            value={brand}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBrand(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Modelo</span>
          <input
            type="text"
            className="input-form"
            required
            disabled={loading}
            value={model}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setModel(e.target.value)
            }
          />
        </label>
        <label>
          <span>Ano</span>
          <input
            type="number"
            className="input-form"
            required
            disabled={loading}
            value={year}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setYear(Number(e.target.value));
            }}
          />
        </label>
        <label>
          <span>Cor</span>
          <input
            type="text"
            className="input-form"
            required
            disabled={loading}
            value={color}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setColor(e.target.value);
            }}
          />
        </label>
        <label>
          <span>Km</span>
          <input
            type="number"
            className="input-form"
            required
            disabled={loading}
            value={km}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKm(Number(e.target.value));
            }}
          />
        </label>
        <div className="form-buttons">
          <button
            type="submit"
            className={`btn btn-submit ${loading && "btn-disabled"}`}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Criar"}
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => handleCancel()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
