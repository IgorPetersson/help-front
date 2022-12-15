import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../components/Footer";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Col, Row } from "react-bootstrap";
import { EquipmentModelContext } from "../../providers/equipmentModel";
import "./index.css"
import { useParams } from "react-router-dom";
import api  from "../../services/api";

const DetailPageModelEquipment = () => {
  const { equipmentModels } = useContext(EquipmentModelContext);
  const { id } = useParams();

  const idParams = parseInt(id as string);

 const [name, setName] = useState("")
 const [description, setDescription] = useState("")

 let token = localStorage.getItem("authToken") || ""

 useEffect(() => {
  api.get(`/models/${parseInt(id as string)}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setName(res.data.name as string)
    setDescription(res.data.description as string)
  });
}, []);

  return (
    <div>
      <header className="header mb-2">
        <HeaderAdmin />
      </header>

      <main className="main">
        <div className="show-box">
          <dl className="row">
            <h4 className="text-center">Dados do Modelo de Equipamento:</h4>
            <br />
            <br />
            <dt className="row">Modelo do Equipamento:</dt>
            <dd className="row">
              <p>{name}</p>
            </dd>

            <dt className="row">Descrição:</dt>
            <Row>
              <Col>
                <dd className="row-10">{description}</dd>
              </Col>
            </Row>

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
export default DetailPageModelEquipment;
