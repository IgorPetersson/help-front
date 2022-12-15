import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { AuthContext } from "../../providers/user";
import { useContext, useEffect, useState } from "react";
import "./index.css"


import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { Footer } from "../../components/Footer";

interface IUserInactice {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  terms_of_use: boolean;
  isActive: boolean;
}

interface ITableUsersProps {
  users: IUserInactice[];
}

const TableUsers = () => {

  const { getUsers, users, acceptOrRejectUsers, setUsers } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, []);


  const deleteUser = (id: number) => {
    acceptOrRejectUsers(false, id)
    
    const newUsers = users.filter((user) => user.id != id)
    setUsers(newUsers)

  }

  const acceptUser = (id: number) => {
    acceptOrRejectUsers(true, id)
    const newUsers = users.filter((user) => user.id != id)
    setUsers(newUsers)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">
              <CloseIcon style={{cursor: "pointer"}} color="error" onClick={() => deleteUser(row.id)} />
              <CheckIcon style={{color: "green", cursor: "pointer"}} onClick={() => acceptUser(row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Users = () => {
  
  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>
      <main className="main">
        
      <div className="form-users" style={{width: "100vw", display:"flex",  flexDirection: "column" ,justifyContent:"center",  alignItems: "center" }}>
        <h1>Novos usuários</h1>
        <div style={{ maxWidth: "400px", display: "flex", justifyContent: "center"}}>
        <TableUsers/>
        </div>
      </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Users;
