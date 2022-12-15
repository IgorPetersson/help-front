import { Form, Button, Row, Col } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EquipmentContext } from "../../providers/equipment";

import api from "../../services/api";
import { EquipmentModelContext } from "../../providers/equipmentModel";

interface IEquipment {
  id: number;
  name: string;
  code: string;
  place: string;
  equipmentModelId: number;
}

const EditEquipment = () => {
  const { id } = useParams();

  const { equipments, updateEquipment, getOneEquipment } =
    useContext(EquipmentContext);
  const { equipmentModels, listEquipmentModels } = useContext(
    EquipmentModelContext
  );
  const navigate = useNavigate();

  const equipmentId = parseInt(id as string);
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  let token = localStorage.getItem("authToken") || "";

  const authorizeUpdate = (): boolean => {
    if (place == "" || code == "" || name == "") {
      return false;
    }

    return true;
  };

  useEffect(() => {
    api
      .get(`/equipments/${parseInt(id as string)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPlace(res.data.place as string);
        setName(res.data.name as string);
        setCode(res.data.code as string);
      });
    listEquipmentModels();
  }, []);

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      place: place,
      code: code,
    };

    if (authorizeUpdate() == true) {
      updateEquipment(equipmentId, data);
      navigate("/equipments", {
        state: -1,
      });
    }
  };

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>

      <main className="main">
        <div className="form-box p-5">
          <Form autoComplete="off">
            <h1 className="text-center w-100, fs-3 fw-normal">
              {" "}
              Editar Equipamento
            </h1>
            <br />

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Modelo do Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="select"
                  name="nameModel"
                  placeholder="Modelo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option>Selecione o Modelo</option>
                  {equipmentModels.map((equipment) => {
                    return (
                      <option value={equipment.name}> {equipment.name}</option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Lugar Onde esta Instalado:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="select"
                  name="place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                >
                  <option>Selecione o lugar</option>
                  <option value={"Atendimento"}>Atendimento</option>
                  <option value={"Secretaria"}>Secretaria</option>
                  <option value={"Desenvolvimento"}>Desenvolvimento</option>
                  <option value={"Escritório"}>Escritório</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Codigo do Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="equipmentId"
                  placeholder="Codigo"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button variant="info" type="submit" onClick={onSubmit}>
              Editar
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

export default EditEquipment;
