import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderUser } from "../../components/HeaderUser";
import { CallsContext } from "../../providers/call";
import { AuthContext } from "../../providers/user";
import { useNavigate } from "react-router-dom";

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

interface IUserLogged {
  firstName: string;
  email: string;
  id: number;
  lastName: string;
  admin: boolean
}

const LandingPageTicket = () => {
  const { listCall, calls, updateCall } = useContext(CallsContext);
  const { userLogged } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  const user: IUserLogged = JSON.parse(localStorage.getItem("user") || "{admin: true, email: ''}");

  if (user.admin == true  ){
    if(user.email != ""){
      navigate("/admin");
    }else{
      navigate("/");
    }
    return <></>
  }


  useEffect(() => {
    listCall();
  }, []);

  
  const filterContent = (x: ICall[], searchTerm: string) => {
    const result = x.filter((call) =>
      call.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result;
  };

  const callsUser: ICall[] = calls.filter(
    (call) => call.userRequesterName == (user.firstName + " " + user.lastName)
  );
  const callsShow: ICall[] =
    search == "" ? callsUser : filterContent(callsUser, search);

  const updateCallUser = (id: number) => {
    updateCall(id)
    window.location.reload()
  }

  return (
    <div>
      <header className="header mb-2">
        <HeaderUser />
      </header>

      <main className="main">
        <div className="container">
          <Container fluid="md">
            <Row>
              <Col>
                <h4>Meus chamados</h4>
              </Col>
            </Row>
            <Row md={3}>
              <Col sm="4">
                <a href={"/add"}>
                  <Button className="btn-success">
                    &nbsp; Adicionar Chamado
                  </Button>
                </a>
              </Col>
              <Col xs={8}></Col>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Pesquisar:{""}
                  </Form.Label>
                  <Col>
                    <Form.Control
                      name="searchStr"
                      type="search"
                      placeholder="Pesquisar ..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Row>
          </Container>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Assunto</th>
                <th>Equipamento</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            {callsShow.map((ticket, index) => (
              <tbody>
                <tr key={ticket.id}>
                  <td>{++index}</td>
                  <td>
                    <a href={`/tickets/${ticket.id}`}> {ticket.subject}</a>
                  </td>
                  <td>{ticket.equipmentName}</td>
                  <td>
                    {" "}
                    {ticket.date && new Date(ticket.date).toLocaleDateString()}
                  </td>
                  <td>{ticket.status == "opening" ? "Chamado Aberto": "Chamado Encerrado"}</td>

                  <td>
                    &nbsp;
                    <Button
            
                      className="btn-warming"
                      disabled={ticket.status == "opening" ? false: true}
                      onClick={() => updateCallUser(ticket.id)}
                    >
                      &nbsp; Encerrar Chamado
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPageTicket;
