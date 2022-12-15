//import { Axios } from "axios";
import { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Footer } from "../../components/Footer";
import { EquipmentContext } from "../../providers/equipment";
import { EquipmentModelContext } from "../../providers/equipmentModel";
import { useNavigate, redirect } from "react-router-dom";
import { AuthContext } from "../../providers/user";

const CreatEquipment = () => {
  const { equipments, createEquipment } = useContext(EquipmentContext);
  const { equipmentModels } = useContext(EquipmentModelContext);

  const { isLogged } = useContext(AuthContext);

  const [place, setPlace] = useState("");
  const [equipmentModelId, setEquipmentModelId] = useState("");
  const [code, setCode] = useState("");

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const name = equipmentModels.filter((eq) => eq.id == parseInt(equipmentModelId))[0].name

    const data = {
      name: name,
      place: place,
      equipmentModelId: parseInt(equipmentModelId),
      code: code
    };

    navigate("/equipments", {
      state: -1,
    });

    createEquipment(data);
  };

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>

      <main className="main">
        <div className="form-box p-5">
          <Form autoComplete="off">
            <h1 className="text-center w-100, fs-3 fw-normal">Equipamento</h1>
            <br />

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Modelo do Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="select"
                  name="nameModel"
                  placeholder="Modelo"
                  value={equipmentModelId}
                  onChange={(e) => setEquipmentModelId(e.target.value)}
                >
                  <option>Selecione o Modelo</option>
                  {equipmentModels.map((equipment) => {
                    return (
                      <option value={equipment.id}> {equipment.name}</option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label> Lugar Onde Esta Instalado:</Form.Label>
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
              <Form.Label> Codigo do Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="equipmentId"
                  placeholder="Código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Col>
            </Form.Group>

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
export default CreatEquipment;
