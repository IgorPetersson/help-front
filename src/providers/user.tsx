import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import api  from "../services/api";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
    children: ReactNode;
}

interface IAuth {
    password: string
    email: string
}

interface INewUser {
  firstName: string
  password: string
  lastName: string
  email: string
  phone: string
}

interface IUser {
  email: string
  admin: boolean
  firstName: string
  id: string
}

interface UserInactice {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  isAdmin: boolean
  terms_of_use: boolean
  isActive: boolean
}

interface IUserLogged {
  firtsName: string
  email: string
  id: number
}

interface IAuthContext {
  signIn: (data: IAuth) => void
  signOut: () => void
  signUp: (data: INewUser) => void
  isLogged: boolean
  users: UserInactice[]
  getUsers: () => void
  acceptOrRejectUsers: (accept: boolean, id: number) => void
  setUsers: Dispatch<SetStateAction<UserInactice[]>>
  userLogged: IUserLogged
  setUserLogged: Dispatch<SetStateAction<IUserLogged>>
}

const defaultValues: IAuthContext = {
    signIn: (data: IAuth) => {console.log("oi")},
    signOut: () => {console.log("oi")},
    signUp: (data: INewUser) => {console.log("oi")},
    isLogged: true,
    users: [],
    getUsers: () => {},
    acceptOrRejectUsers: (accpet: boolean, id: number) => {},
    setUsers: () => {},
    userLogged: {email: "", firtsName: "", id: 0}, 
    setUserLogged: () => {}
}

export const AuthContext = createContext<IAuthContext>(defaultValues);

export const AuthProvider = ({ children }: IAuthProvider) => {

  const localToken = localStorage.getItem("authToken") || ""

  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(
    localToken != "" ? true : false
  );

  const [users, setUsers] = useState<UserInactice[]>([])
  const [userLogged, setUserLogged] = useState<IUserLogged>({
    email: "", firtsName: "", id: 0
  })

  const signIn = (data: IAuth) => {
    api
      .post("/login", data)
      .then((response) => {

        const user: IUser = jwtDecode(response.data.accessToken)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("authToken", response.data.accessToken);
        setIsLogged(true);
        setUserLogged({email: user.email, firtsName: user.firstName, id: parseInt(user.id)})
        if(user.admin == true){
          navigate("/admin");  
        }else{
          navigate("/tickets");  
        }
        
      })
      .catch((err) => {
          console.log("Error -> ", err)
      })
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/", {
      state: -1
    })
    return window.location.reload();
  };

  const signUp = (data: INewUser) => {
    console.log("User -> ", data)
    api
      .post("/users", data)
      .then((response) => {
        console.log("Criado")
        navigate("/", {
          state: -1
        });
      })
      .catch((err) => {
          console.log("Error -> ", err)
      })
  }

  const getUsers = () => {
    api
      .get("/users", { headers: { Authorization: `Bearer ${localToken}` } })
      .then((resp) => {
        setUsers(resp.data);
      });
  };

  const acceptOrRejectUsers = (accept: boolean, userId: number) => {
    
    const data = {
      isActive: accept
    }

    console.log(data)
    console.log(localToken)
    
    api.post("/users/acept/"+userId, data, { headers: { Authorization: `Bearer ${localToken}` } })
    .then((response) => {
      console.log("AQUI")
    })
    .catch((err) => {
        console.log("Error -> ", err)
    })
  } 
  

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLogged, signUp, users, getUsers, acceptOrRejectUsers, setUsers, userLogged, setUserLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
