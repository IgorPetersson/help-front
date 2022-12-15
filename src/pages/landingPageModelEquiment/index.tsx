import {useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { EquipmentModelContext } from "../../providers/equipmentModel";
import { useNavigate } from "react-router-dom";

interface IEquipmentModel {
  id: number;
  name: string;
  description: string
}

const LandingPageModelEquipment = () => {

  const {equipmentModels, deleteEquipmentModel, setEquipmentModels, listEquipmentModels} = useContext(EquipmentModelContext)
  const [equipmentModelFilter, setEquipmentModelFilter] = useState<IEquipmentModel[]>([])
  const [search, setSearch] = useState("")

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{admin: false, email: ''}")

  useEffect(() => {
    listEquipmentModels()
  },[])

  if (user.admin == false  ){
    if(user.email != ""){
      navigate("/tickets");
    }else{
      navigate("/");
    }
    return <></>
  }

  const filterContent = (searchTerm: string) => {
    const result = equipmentModels.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result
  }

  const actionDelete = (id: number) => {
    deleteEquipmentModel(id)

    const newModels = equipmentModels.filter((eq) => eq.id != id)
    setEquipmentModels(newModels)
  }

  const showModels = search == "" ? equipmentModels : filterContent(search)

    return (
      <div>
        <header className="header mb-2">
          <HeaderAdmin />
        </header>

        <main className="main" style={{paddingTop: "10px"}}>
          <div className="container">
            <Container fluid="md">
              <Row>
                <Col>
                  <h4>Todos os Modelos de Equipamentos</h4>
                </Col>
              </Row>
              <Row md={3}>
                <Col sm="4">
                  <a href={"/addModelEquipment"}>
                    <Button className="btn-success">
                      &nbsp; Adicionar Novo Modelo de Equipamento
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
                        value={search}
                        type="search"
                        placeholder="Pesquisar ..."
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

                  <th>Ações</th>
                </tr>
              </thead>
              {showModels.map((equipment, index) => (
                <tbody>
                  <tr key={equipment.id}>
                    <td>{++index}</td>
                    <td>
                      <a href={`/modelsEquipment/${equipment.id}`}>
                        {" "}
                        {equipment.name}
                      </a>
                    </td>

                    <td>
                      <a href={`/editModelEquipment/${equipment.id}`}>
                        <Button className="btn-warming">Editar</Button>
                      </a>
                      &nbsp;
                      <Button
                        className="btn-danger"
                        onClick={() => actionDelete(equipment.id)}
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
  }

export default LandingPageModelEquipment;
