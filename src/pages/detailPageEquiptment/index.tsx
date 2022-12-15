import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EquipmentContext } from "../../providers/equipment";
import "./index.css"
import api  from "../../services/api";

const DetailPageEquipment = () => {
  const { id } = useParams();

  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  let token = localStorage.getItem("authToken") || ""

  useEffect(() => {
    api.get(`/equipments/${parseInt(id as string)}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setPlace(res.data.place as string)
      setName(res.data.name as string)
      setCode(res.data.code as string)
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
        <div className="show-box">
          <dl className="row">
            <h4 className="text-center">Dados do Equipamento:</h4>
            <br />
            <br />
            <dt className="row">Modelo do Equipamento:</dt>
            <dd className="row">
              {name}
            </dd>

            <dt className="row">Codigo do Equipamento:</dt>
            <dd className="row">{code}</dd>

            <dt className="row"> Lugar de Instalação do Equipamento:</dt>
            <dd className="row">{place}</dd>

            <br />
            <br />
          </dl>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default DetailPageEquipment;


