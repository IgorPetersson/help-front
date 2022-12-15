import jwtDecode from "jwt-decode";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

interface ICall {
  id: number;
  subject: string;
  date: string;
  description: string;
  responsibleLocale: string;
  status: string;
  userRequesterId: number;
  userSolvedId: number;
  userRequesterName: string;
  equipmentId: number;
  equipmentCode: string;
  equipmentPlace: string;
  equipmentName: string;
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

interface ICallCreate {
  subject: string;
  description: string;
  responsibleLocale: string;
  equipmentId: number;
}

interface IReport {
  office: ICall[];
  secretary: ICall[];
  development: ICall[];
  attendance: ICall[];
}

interface ICallProvider {
  children: ReactNode;
}

interface ICallContext {
  calls: ICall[];
  createCall: (call: ICallCreate) => void;
  listCall: () => void;
  getOneCall: (callId: number) => void;
  deleteCall: (callId: number) => void;
  updateCall: (callId: number) => void;
  createReport: (start: string, end: string) => Promise<IReport>
  setCalls: Dispatch<SetStateAction<ICall[]>>;
}

const defaultValus: ICallContext = {
  calls: [],
  createCall: (call: ICallCreate) => {},
  listCall: () => {},
  getOneCall: (callId: number) => {},
  deleteCall: (callId: number) => {},
  updateCall: (callId: number) => {},
  createReport: (start: string, end: string) => {
    return Promise.resolve({
      office: [],
      secretary: [],
      development: [],
      attendance: [],
    });
  },
  setCalls: () => {},
};

export const CallsContext = createContext<ICallContext>(defaultValus);

export const CallsProvider = ({ children }: ICallProvider) => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [reports, setReports] = useState<IReport>({
    office: [],
    secretary: [],
    development: [],
    attendance: [],
  });
  const [control, setControl] = useState(false)

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken") || "";
  } else {
  }
  //const user: IUser = jwtDecode(token);

  const listCall = () => {
    api
      .get("/calls", { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setCalls(resp.data);
      });
  };

  useEffect(() => {
    listCall();
  }, [control]);

  const createCall = (data: ICallCreate) => {
    api
      .post("/calls", data, { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setCalls([...calls, resp.data]);
        setControl(!control)
      });
  };

  const getOneCall = (callId: number) => {
    api.get(`/calls/${callId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const deleteCall = (callId: number) => {
    api.delete(`/calls/${callId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const updateCall = (callId: number) => {
    api
      .patch(
        `/calls/${callId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => console.log("Err -> ", err));
  };

  const createReport = async (start: string, end: string) => {
    const res = await api.post("/report", {
      "date_start": start,
      "date_end": end
    } , {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data as IReport;
  };

  return (
    <CallsContext.Provider
      value={{
        calls,
        createCall,
        createReport,
        deleteCall,
        getOneCall,
        listCall,
        updateCall,
        setCalls,
      }}
    >
      {children}
    </CallsContext.Provider>
  );
};
