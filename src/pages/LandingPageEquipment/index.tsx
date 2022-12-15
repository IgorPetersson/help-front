import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Footer } from "../../components/Footer";
import { EquipmentContext } from "../../providers/equipment";
import { useNavigate } from "react-router-dom";

interface IEquipment {
  id: number;
  name: string;
  code: string;
  place: string;
  equipmentModelId: number;
}

const LandingPageEquipment = () => {
  const { equipments, deleteEquipment, listEquipments } = useContext(EquipmentContext);

  const [search, setSearch] = useState("")
  const [deleted, setDeleted] = useState(false)
  
  const filterContent = (searchTerm: string) => {
    const result = equipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result
  };

  useEffect(() => {
    listEquipments()
  }, [])

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{admin: false, email: ''}")

  if (user.admin == false  ){
    if(user.email != ""){
      navigate("/tickets");
    }else{
      navigate("/");
    }
    return <></>
  }

  const showEquipments = search == "" ? equipments : filterContent(search)

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>

      <main className="main">
        <div className="container">
          <Container fluid="md">
            <Row>
              <Col>
                <h4>Todos os Equipamentos</h4>
              </Col>
            </Row>
            <Row md={3}>
              <Col sm="4">
                <a href={"/addEquipment"}>
                  <Button className="btn-success">
                    &nbsp; Adicionar Novo Equipamento
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
                <th>Modelo do Equipamento</th>
                <th>Codigo do Equipamento</th>
                <th>Lugar de Instalação</th>
                <th>Ações</th>
              </tr>
            </thead>
            {showEquipments.sort((a, b) => a.id - b.id).map((equipment, index) => (
              <tbody key={index}>
                <tr key={equipment.id}>
                  <td>{++index}</td>
                  <td>
                    <a href={`/equipments/${equipment.id}`}>
                      {" "}
                      {equipment.name}
                    </a>
                  </td>
                  <td>{equipment.code}</td>
                  <td>{equipment.place}</td>

                  <td>
                    <a href={`/editEquipment/${equipment.id}`}>
                      <Button className="btn-warming">Editar</Button>
                    </a>
                    &nbsp;
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        deleteEquipment(equipment.id)
                        setDeleted(!deleted)
                      }}
                    >
                      &nbsp; Apagar
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

export default LandingPageEquipment;
