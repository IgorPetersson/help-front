import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import api  from "../services/api";

interface IEquipment {
  id: number;
  name: string;
  code: string;
  place: string;
  equipmentModelId: number;
}

interface IEquipmentUpdate {
  name: string;
  code: string;
  place: string;
}

interface IEquipmentCreate {
  name: string
  place: string;
  equipmentModelId: number;
  code: string
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isAdmin: boolean;
  terms_of_use: boolean;
  isActive: boolean;
}

interface IEquipmentProvider {
  children: ReactNode;
}

interface IEquipmentContext {
  equipments: IEquipment[]
  createEquipment: (equipment: IEquipmentCreate) => void
  listEquipments: () => void
  getOneEquipment: (equipmentId: number) => void
  deleteEquipment: (equipmentId: number) => void
  updateEquipment: (equipmentId: number, data: IEquipmentUpdate) => void
}

const defaultValus: IEquipmentContext = {
  equipments: [],
  createEquipment: (equipment: IEquipmentCreate) => {},
  listEquipments: () => {},
  getOneEquipment: (equipmentId: number) => {},
  deleteEquipment: (equipmentId: number) => {},
  updateEquipment: (equipmentId: number, data: IEquipmentUpdate) => {},
};

export const EquipmentContext = createContext<IEquipmentContext>(defaultValus);

export const EquipmentProvider = ({ children }: IEquipmentProvider) => {
  
  const [equipments, setEquipments] = useState<IEquipment[]>([]);
  const [control, setControl] = useState(false)

  let token = localStorage.getItem("authToken") || ""

  const listEquipments = () => {
    api
      .get("/equipments", { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setEquipments(resp.data);
      });
  };
  
  useEffect(() => {
    listEquipments()
  }, [control])

  const createEquipment = (data: IEquipmentCreate) => {
    api.post("/equipments", data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      const x = equipments
      x.push(res.data)
      setEquipments(x)
      setControl(!control)
    });
  };

  const getOneEquipment = (equipmentId: number) => {
    api.get(`/equipments/${equipmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const deleteEquipment= (equipmentId: number) => {
    api.delete(`/equipments/${equipmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const x = equipments.filter((eq) => eq.id != equipmentId)
      setEquipments(x)
    } );
  };

  const updateEquipment= (equipmentId: number, data: IEquipmentUpdate) => {
    api.patch(`/equipments/${equipmentId}`, data,{
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const x = equipments.filter((eq) => eq.id == equipmentId)
      x.push(res.data)
      setEquipments(x)
    });

  };

  return (
    <EquipmentContext.Provider value={{ createEquipment, deleteEquipment, equipments, getOneEquipment, listEquipments, updateEquipment }}>{children}</EquipmentContext.Provider>
  );
};
