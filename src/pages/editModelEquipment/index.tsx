import { Form, Button, Row, Col } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EquipmentModelContext } from "../../providers/equipmentModel";
import api  from "../../services/api";

const EditModelEquipment = () => {
  const { id } = useParams();
  const { equipmentModels, updateEquipmentModel } = useContext(
    EquipmentModelContext
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      description: description,
      name: name,
    };

    updateEquipmentModel(parseInt(id as string), data);
    navigate("/modelsEquipment", {
      state: -2
    })
  };

  let token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    api
      .get(`/models/${parseInt(id as string)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setName(res.data.name as string);
        setDescription(res.data.description as string);
      });
  }, []);

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
              {" "}
              Editar Modelo de equipamento
            </h1>
            <br />

            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={3}>
                Modelo do Equipamento:
              </Form.Label>
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

export default EditModelEquipment;
