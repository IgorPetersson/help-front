import  { useEffect, useState } from "react";
import { Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderUser } from "../../components/HeaderUser";

import { useContext } from "react";
import { CallsContext } from "../../providers/call";
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

const LandingPagecall = () => {
  const { calls, updateCall, setCalls, listCall } = useContext(CallsContext);
  const [searchCalls, setSearchCalls] = useState<ICall[]>([]);
  
  const filterContent = (searchTerm: string) => {
    const result = calls.filter((call) =>
      call.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchCalls(result);
  };

  useEffect(() => {
    listCall()
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

  const resolveCall = (id: number) => {
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
                <h4>Todos os Chamados</h4>
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
                      onChange={(e) => filterContent(e.target.value)}
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
            {calls.map((call, index) => (
              <tbody>
                <tr key={call.id}>
                  <td>{++index}</td>
                  <td>
                    <a href={`/calls/${call.id}`}> {call.subject}</a>
                  </td>
                  <td>{call.equipmentName}</td>
                  <td>
                    {" "}
                    {call.date &&
                      new Date(call.date).toLocaleDateString()}
                  </td>
                  <td>{call.status}</td>

                  <td>
                    &nbsp;
                    <Button
                      className="btn-warming"
                      onClick={() => resolveCall(call.id)}
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
export default LandingPagecall;
