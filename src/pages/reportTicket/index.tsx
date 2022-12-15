import { useContext, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { CallsContext } from "../../providers/call";
import "./index.css";

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

interface IReport {
  office: ICall[];
  secretary: ICall[];
  development: ICall[];
  attendance: ICall[];
}

export const ReportTicket = () => {
  const { createReport } = useContext(CallsContext);
  const [reports, setReports] = useState<IReport>({
    office: [],
    secretary: [],
    development: [],
    attendance: [],
  });

  const [end, setEnd] = useState("");
  const [start, setStart] = useState("");
  const [show, setShow] = useState(false);

  const onReport = async () => {
    if (start.length == 10 && end.length == 10 && end[2] == "/" && end[5] == "/" && start[2] == "/" && start[5] == "/") {
      try{
      const initDate = start.split("/");
      const endDate = end.split("/");

      const iDate = new Date(
        parseInt(initDate[2]),
        parseInt(initDate[1]),
        parseInt(initDate[0])
      ).toLocaleDateString("en-CA");
      const eDate = new Date(
        parseInt(endDate[2]),
        parseInt(endDate[1]),
        parseInt(endDate[0])
      ).toLocaleDateString("en-CA");

      const result = await createReport(iDate, eDate);
      setReports(result);
      setShow(true);
      }catch{
        console.log("Erro no relatório")
      }
    }
  };

  interface IResult {
    name: string;
    open: number;
    close: number;
    total: number;
  }

  const grupyCall = (callsDepartment: ICall[]): IResult[] => {
    const equipments = callsDepartment.map((c) => c.equipmentName);

    const setEquipments = [...new Set(equipments)];

    const result = setEquipments.map((c) => {
      const open = callsDepartment.filter(
        (x) => x.status == "opening" && x.equipmentName == c
      ).length;
      const close = callsDepartment.filter(
        (x) => x.status == "closed" && x.equipmentName == c
      ).length;
      return {
        name: c,
        open: open,
        close: close,
        total: open + close,
      };
    });

    return result;
  };

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>
      <main className="main">
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Relatório</h1>

        <div
          style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        >
          <div className="div-head">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="startDate">De:</label>
              <input
                type="text"
                value={start}
                className="form-control"
                placeholder="dd/mm/aaaa"
                id="startDate"
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="endDate">Até:</label>
              <input
                type="text"
                value={end}
                className="form-control"
                id="endDate"
                placeholder="dd/mm/aaaa"
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            <button onClick={onReport}>Gerar relatório</button>
          </div>
        </div>

        {show ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: "900px" }}>
              {reports?.secretary.length > 0 ? (
                <>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="text-center">
                      <h4>Secretaria</h4>
                    </Col>
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Modelo de Equipamento</th>
                        <th>Chamado Encerrados</th>
                        <th>Chamados em Aberto</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {grupyCall(reports?.secretary).map((report) => (
                        <tr>
                          <td style={{ width: "360px" }}>{report.name}</td>
                          <td>{report.open}</td>
                          <td>{report.close}</td>
                          <td>{report.total}</td>
                        </tr>
                      ))}
                    </tbody>

                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>
                          {
                            reports?.secretary.filter(
                              (r) => r.status == "opening"
                            ).length
                          }
                        </th>
                        <th>
                          {
                            reports?.secretary.filter(
                              (r) => r.status == "closed"
                            ).length
                          }
                        </th>
                        <th>{reports?.secretary.length}</th>
                      </tr>
                    </thead>
                  </Table>
                </>
              ) : (
                <></>
              )}

              {reports?.attendance.length > 0 ? (
                <>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="text-center">
                      <h4>Atendimento</h4>
                    </Col>
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Modelo de Equipamento</th>
                        <th>Chamado Encerrados</th>
                        <th>Chamados em Aberto</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {grupyCall(reports?.attendance).map((report) => (
                        <tr>
                          <td style={{ width: "360px" }}>{report.name}</td>
                          <td>{report.open}</td>
                          <td>{report.close}</td>
                          <td>{report.total}</td>
                        </tr>
                      ))}
                    </tbody>

                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>
                          {
                            reports?.attendance.filter(
                              (r) => r.status == "opening"
                            ).length
                          }
                        </th>
                        <th>
                          {
                            reports?.attendance.filter(
                              (r) => r.status == "closed"
                            ).length
                          }
                        </th>
                        <th>{reports?.attendance.length}</th>
                      </tr>
                    </thead>
                  </Table>
                </>
              ) : (
                <></>
              )}

              {reports?.development.length > 0 ? (
                <>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="text-center">
                      <h4>Desenvolvimento</h4>
                    </Col>
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Modelo de Equipamento</th>
                        <th>Chamado Encerrados</th>
                        <th>Chamados em Aberto</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {grupyCall(reports?.development).map((report) => (
                        <tr>
                          <td style={{ width: "360px" }}>{report.name}</td>
                          <td>{report.open}</td>
                          <td>{report.close}</td>
                          <td>{report.total}</td>
                        </tr>
                      ))}
                    </tbody>

                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>
                          {
                            reports?.development.filter(
                              (r) => r.status == "opening"
                            ).length
                          }
                        </th>
                        <th>
                          {
                            reports?.development.filter(
                              (r) => r.status == "closed"
                            ).length
                          }
                        </th>
                        <th>{reports?.development.length}</th>
                      </tr>
                    </thead>
                  </Table>
                </>
              ) : (
                <></>
              )}

              {reports.office.length > 0 ? (
                <>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="text-center">
                      <h4>Escritório</h4>
                    </Col>
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Modelo de Equipamento</th>
                        <th>Chamado Encerrados</th>
                        <th>Chamados em Aberto</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {grupyCall(reports?.office).map((report) => (
                        <tr>
                          <td style={{ width: "360px" }}>{report.name}</td>
                          <td>{report.close}</td>
                          <td>{report.open}</td>
                          <td>{report.total}</td>
                        </tr>
                      ))}
                    </tbody>

                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>
                          {
                            reports?.office.filter((r) => r.status == "closed")
                              .length
                          }
                        </th>
                        <th>
                          {
                            reports?.office.filter((r) => r.status == "opening")
                              .length
                          }
                        </th>
                        <th>{reports?.office.length}</th>
                      </tr>
                    </thead>
                  </Table>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
