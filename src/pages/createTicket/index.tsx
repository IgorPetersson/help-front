import React, { Component, useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { HeaderUser } from "../../components/HeaderUser";
import { CallsContext } from "../../providers/call";
import { EquipmentContext } from "../../providers/equipment";
import { EquipmentModelContext } from "../../providers/equipmentModel";
import { AuthContext } from "../../providers/user";

interface ICallCreate {
  subject: string;
  description: string;
  responsibleLocale: string;
  equipmentId: number;
  userRequestId: number;
  phoneUser: string
}

interface IUserLogged {
  firstName: string;
  email: string;
  id: number;
  phone: string;
  lastName: string;
}

const CreateTicket = () => {
  const { calls, createCall } = useContext(CallsContext);
  const { equipments, listEquipments } = useContext(EquipmentContext);
  const { equipmentModels } = useContext(EquipmentModelContext);
  
  const [description, setDescription] = useState("");
  const [responsibleLocale, setResponsibleLocale] = useState("");
  const [subject, setSubject] = useState("");
  const [equipment, setEquipment] = useState("");

  const[nameModel, setNameModel] = useState("")
  const [currentDate] = useState(new Date().toLocaleDateString("en-US"))
  const [place, setPlace] = useState("")

  const userLogged = JSON.parse(localStorage.getItem("user") || "{}") as IUserLogged

  const [nameUser] = useState(userLogged.firstName + " " + userLogged.lastName)
  const [phone] = useState(userLogged.phone)
  
  useEffect(() => {
    listEquipments();
  }, []);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{admin: true, email: ''}"
  );

  if (user.admin == true) {
    if (user.email != "") {
      navigate("/equipments");
    } else {
      navigate("/");
    }
    return <></>;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    const equipmentProduct = equipments.filter(
      (eq) => eq.id == parseInt(equipment)
    )[0];

    const user: IUserLogged = JSON.parse(localStorage.getItem("user") || "{}");

    const data: ICallCreate = {
      description: description,
      equipmentId: equipmentProduct.id,
      responsibleLocale: responsibleLocale,
      subject: subject,
      userRequestId: user.id,
      phoneUser: user.phone
    };

    setDescription("");
    setSubject("");
    setResponsibleLocale("");
    setEquipment("");

    createCall(data);
    navigate("/tickets", {
      state: -1
    })
  };

  return (
    <div>
      <header className="header mb-2">
        <HeaderUser />
      </header>

      <main className="main">
        <div className="form-box p-5">
          <Form autoComplete="off">
            <h1 className="text-center w-100, fs-3 fw-normal">Chamado</h1>
            <br />
            <div>
            <div>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={3}>
                Assunto:
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Assunto"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label> Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="select"
                  name="equipmentId"
                  //placeholder="Codigo do Equipamento"
                  value={equipment}
                  onChange={(e) => {
                    const eq = equipments.filter((x) => x.id == parseInt(e.target.value))[0]
                    setEquipment(e.target.value)
                    setPlace(eq.place)
                    setNameModel(eq.name)
                  }
                  }
                >
                  <option>Codigo do Equipamento:</option>
                  {equipments.map((equipment) => {
                    return (
                      <option value={equipment.id}> {equipment.code}</option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={3}>
                Equipamento:
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Assunto"
                  value={nameModel}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
            <Form.Label> Lugar de instalação:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Assunto"
                  value={place}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
            <Form.Label>Data:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Assunto"
                  value={currentDate}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label column> Ocorrência Observada:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
              </Col>
            </Form.Group>
            </div>
            
            <div>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label> Nome Completo:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="bossUser"
                  placeholder="Nome completo"
                  value={nameUser}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Telefone:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="bossUser"
                  placeholder="Nome do Responsável Local"
                  value={phone}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label> Nome do Responsável Local:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="bossUser"
                  placeholder="Nome do Responsável Local"
                  value={responsibleLocale}
                  onChange={(e) => setResponsibleLocale(e.target.value)}
                />
              </Col>
            </Form.Group>
            </div>
            </div>

            <Button variant="info" type="submit" onClick={onSubmit}>
              Enviar
            </Button>
            <br />
          </Form>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default CreateTicket;
