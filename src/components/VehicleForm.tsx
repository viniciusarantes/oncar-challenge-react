import { FormEvent, useState } from "react";
import "./VehicleForm.css";

interface VehicleFormProps {
  setIsInsert: React.Dispatch<React.SetStateAction<boolean>>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ setIsInsert }) => {
  const [brand, setBrand] = useState<string>();
  const [model, setModel] = useState<string>();
  const [year, setYear] = useState<number>();
  const [color, setColor] = useState<string>();
  const [km, setKm] = useState<number>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
  };

  const handleCancel = () => {
    setBrand("");
    setModel("");
    setYear(0);
    setColor("");
    setKm(0);
    setIsInsert(false);
  };
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
            value={km}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKm(Number(e.target.value));
            }}
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">
            Criar
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
