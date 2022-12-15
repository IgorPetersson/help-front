import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { HeaderUser } from "../../components/HeaderUser";
import { CallsContext } from "../../providers/call";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./index.css";
import { HeaderAdmin } from "../../components/HeaderAdmin";

const DetailPageTicket = () => {
  const { id } = useParams();

  const [userRequesterName, setUserRequesterName] = useState("");
  const [responsibleLocale, setResponsibleLocale] = useState("");
  const [status, setStatus] = useState("");
  const [subject, setSujbect] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentCode, setEquipmentCode] = useState("");
  const [equipmentPlace, setEquipmentPlace] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{admin: false, email: ''}"
  );

  let token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    api
      .get(`/calls/${parseInt(id as string)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEquipmentCode(res.data.equipmentCode as string);
        setEquipmentName(res.data.equipmentName as string);
        setSujbect(res.data.subject as string);
        setStatus(res.data.status as string);
        setResponsibleLocale(res.data.responsibleLocale as string);
        setUserRequesterName(res.data.userRequesterName as string);
        setDescription(res.data.description as string);
        setEquipmentPlace(res.data.equipmentPlace as string);
        setPhone(user.phone);
      });
  }, []);

  if (user.email == "") {
    navigate("/");
    return <></>;
  }

  return (
    <div>
      <header className="header mb-2">
        {user.admin == true ? <HeaderAdmin /> : <HeaderUser />}
      </header>

      <main className="main">
        <div className="show-box">
          <h4 className="text-center">
            Status:{" "}
            {status == "opening" ? "Chamado aberto" : "Chamado encerrado"}
          </h4>
          <dl className="row">
            <h4 className="text-left">Dados do Chamado:</h4>
            <br />
            <dt className="col-sm-3">Assunto:</dt>
            <dd className="col-sm-9">{subject}</dd>
            <dt className="col-sm-3">Equipamento:</dt>
            <dd className="col-sm-9">
              <p>{equipmentName}</p>
            </dd>
            <dt className="col-sm-3"> Codigo do Equipamento:</dt>
            <dd className="col-sm-9">
              <p>{equipmentCode}</p>
            </dd>
            <dt className="col-sm-3"> Local de Instalação:</dt>
            <dd className="col-sm-9">
              <p>{equipmentPlace}</p>
            </dd>
            <dt className="col-sm-3">Descrição:</dt>
            <dd className="col-sm-9">{description}</dd>

            <br />
            <br />
            <hr />
            <h4 className="text-left">Dados do Usuario:</h4>
            <br />
            <dt className="col-sm-3">Nome:</dt>
            <dd className="col-sm-9">{userRequesterName}</dd>
            <dt className="col-sm-3">Telefone:</dt>
            <dd className="col-sm-9">{phone}</dd>
            <dt className="col-sm-3">Resposavel do Local:</dt>
            <dd className="col-sm-9">{responsibleLocale}</dd>
          </dl>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default DetailPageTicket;
