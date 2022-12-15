import { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { EquipmentModelContext } from "../../providers/equipmentModel";

const CreateModelEquipment = () => {
  const { equipmentModels, createEquipmentModel } = useContext(
    EquipmentModelContext
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      description: description,
    };

    setName("")
    setDescription("")

    createEquipmentModel(data);
    navigate("/", {
      state: -1
    });
  };

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

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>

      <main className="main">
        <div className="form-box p-5">
          <Form autoComplete="off">
            <h1 className="text-center w-100, fs-3 fw-normal">
              Modelo do Equipamento
            </h1>
            <br />

            <Form.Group className="mb-3" as={Row}>
              <Form.Label>Modelo do Equipamento:</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="text"
                  name="equipmentModel"
                  placeholder="Modelo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={3}>
                {" "}
                Descrição:
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
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

export default CreateModelEquipment;
