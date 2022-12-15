import jwtDecode from "jwt-decode";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface IEquipmentModel {
  id: number;
  name: string;
  description: string;
}

interface IEquipmentModelCreate {
  name: string;
  description: string;
}

interface IEquipmentModelUpdate {
  name: string;
  description: string;
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

interface IEquipmentModelProvider {
  children: ReactNode;
}

interface IEquipmentModelContext {
  equipmentModels: IEquipmentModel[];
  createEquipmentModel: (equipmentModel: IEquipmentModelCreate) => void;
  listEquipmentModels: () => void;
  getOneEquipmentModel: (equipmentModelId: number) => void;
  deleteEquipmentModel: (equipmentModelId: number) => void;
  updateEquipmentModel: (
    equipmentModelId: number,
    data: IEquipmentModelUpdate
  ) => void;
  setEquipmentModels: Dispatch<React.SetStateAction<IEquipmentModel[]>>
}

const defaultValus: IEquipmentModelContext = {
  equipmentModels: [],
  setEquipmentModels: () => {},
  createEquipmentModel: (equipmentModel: IEquipmentModelCreate) => {},
  listEquipmentModels: () => {},
  getOneEquipmentModel: (equipmentModelId: number) => {},
  deleteEquipmentModel: (equipmentModelId: number) => {},
  updateEquipmentModel: (equipmentModelId: number, data: IEquipmentModelUpdate) => {},
};

export const EquipmentModelContext =
  createContext<IEquipmentModelContext>(defaultValus);

export const EquipmentModelProvider = ({
  children,
}: IEquipmentModelProvider) => {
  const [equipmentModels, setEquipmentModels] = useState<IEquipmentModel[]>([]);

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken") || "";
  } else {
  }
  //const user: IUser = jwtDecode(token);

  const listEquipmentModels = () => {
    api
      .get("/models", { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setEquipmentModels(resp.data);
      });
  };

  const createEquipmentModel = (data: IEquipmentModelCreate) => {
    api.post("/models", data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const x = equipmentModels
      x.push(res.data)
      setEquipmentModels(x)
    }) ;
  };

  const getOneEquipmentModel = (equipmentModelId: number) => {
    api.get(`/models/${equipmentModelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const deleteEquipmentModel = (equipmentModelId: number) => {
    api.delete(`/models/${equipmentModelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const updateEquipmentModel = (
    equipmentModelId: number,
    data: IEquipmentModelUpdate
  ) => {
    api.patch(`/models/${equipmentModelId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const x = equipmentModels.filter((em) => em.id != equipmentModelId)
      x.push(res.data)
      setEquipmentModels(x)
    });
  };

  return (
    <EquipmentModelContext.Provider
      value={{
        createEquipmentModel,
        deleteEquipmentModel,
        equipmentModels,
        getOneEquipmentModel,
        listEquipmentModels,
        updateEquipmentModel,
        setEquipmentModels
      }}
    >
      {children}
    </EquipmentModelContext.Provider>
  );
};