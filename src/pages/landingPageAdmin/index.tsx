import React, { Component, useContext, useEffect, useState } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { CallsContext } from "../../providers/call";

const LandPageAdmin = () => {
  const { calls, createCall, deleteCall, listCall, setCalls, updateCall } =
    useContext(CallsContext);

  const [searchSubject, setSearchSuject] = useState("");
  const [searchEquipment, setSearchEquipment] = useState("");
  const [searchStatus, setSearchStatus] = useState("opening");


  let dateA = new Date();
  dateA.setDate(dateA.getDate() - 30);
  
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [initDate, setInitDate] = useState(
    dateA.toLocaleDateString("en-CA")
  );

  useEffect(() => {
    listCall();
  }, []);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{admin: false, email: ''}"
  );

  if (user.admin == false) {
    if (user.email != "") {
      navigate("/tickets");
    } else {
      navigate("/");
    }
    return <></>;
  }

  const resolveCall = (id: number) => {
    updateCall(id);
  };

  const callsShow = calls.filter(
    (c) =>
      c.status == searchStatus &&
      c.equipmentName.toLowerCase().includes(searchEquipment.toLowerCase()) &&
      c.subject.toLowerCase().includes(searchSubject.toLowerCase()) 
      //&&
      //((new Date(c.date) <= new Date(endDate) && new Date(c.date) >= new Date(initDate)) 
      //|| (initDate == new Date(c.date).toLocaleDateString("en-CA")) && endDate == new Date(c.date).toLocaleDateString("en-CA"))
  );

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>
      <main className="main">
        <Container>
          <Row>
            <Col sm="3" className="show-box2">
              <div className="row my-5">
                <div className="col">
                  <h4 className="border-bottom">Filtros</h4>
                </div>
                <div className="col-sm-12 my-2">
                  <label htmlFor="name">Assunto</label>
                  <input
                    value={searchSubject}
                    onChange={(e) => setSearchSuject(e.target.value)}
                    placeholder="Assunto"
                    type="text"
                    className="form-control"
                    id="title"
                  />
                </div>

                <div className="col-sm-12 my-2">
                  <label htmlFor="email">Equipamento</label>
                  <input
                    onChange={(e) => setSearchEquipment(e.target.value)}
                    value={searchEquipment}
                    placeholder="Equipamento"
                    type="text"
                    className="form-control"
                    id="equipment"
                  />
                </div>

                <div className="col-sm-12 my-2">
                  <label htmlFor="gender">Status</label>
                  <select
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="form-control"
                    id="status"
                    placeholder=""
                  >
                    <option value="opening">Chamado em Aberto</option>
                    <option value="closed">Chamado Encerrado</option>
                  </select>
                </div>

                <div className="col-sm-12 my-2">
                  <label htmlFor="startDate">De:</label>
                  <input
                    value={initDate}
                    type="date"
                    className="form-control"
                    id="startDate"
                    onChange={(e) => {
                      const dateError = new Date(e.target.value)
                      dateError.setDate(dateError.getDate() + 1)
                      setInitDate(dateError.toLocaleDateString("en-CA"))
                    }}
                  />
                </div>
                <div className="col-sm-12 my-2">
                  <label htmlFor="endDate">Até:</label>
                  <input
                    value={endDate}
                    type="date"
                    className="form-control"
                    id="endDate"
                    onChange={(e) => {
                      const dateError = new Date(e.target.value)
                      dateError.setDate(dateError.getDate() + 1)
                      setEndDate(dateError.toLocaleDateString("en-CA"))
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col sm="9">
              <div className="container">
                <Container fluid="md">
                  <Row>
                    <Col>
                      <h4>Todos os Chamados</h4>
                    </Col>
                  </Row>

                  <Row md={3}></Row>
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
                  {callsShow.sort((a, b) => b.id - a.id).map((ticket, index) => (
                    <tbody>
                      <tr key={ticket.id}>
                        <td>{++index}</td>
                        <td>
                          <a href={`/tickets/${ticket.id}`}>
                            {" "}
                            {ticket.subject}
                          </a>
                        </td>
                        <td>{ticket.equipmentName}</td>
                        <td>
                          {" "}
                          {ticket.date &&
                            new Date(ticket.date).toLocaleDateString()}
                        </td>
                        <td>
                          {ticket.status == "opening"
                            ? "Chamado Aberto"
                            : "Chamado Encerrado"}
                        </td>

                        <td>
                          &nbsp;
                          <Button
                            className="btn-warming"
                            onClick={() => resolveCall(ticket.id)}
                            disabled={ticket.status == "opening" ? false: true}
                          >
                            &nbsp; Encerrar Chamado
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default LandPageAdmin;
