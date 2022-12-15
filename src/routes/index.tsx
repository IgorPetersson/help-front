import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import CreatEquipment from "../pages/createEquipment";
import CreateModelEquipment from "../pages/createModelEquipment";
import CreateTicket from "../pages/createTicket";
import DetailPageEquipment from "../pages/detailPageEquiptment";
import DetailPageModelEquipment from "../pages/detailPageModelEquipment";
import EditEquipment from "../pages/editEquipment";
import EditModelEquipment from "../pages/editModelEquipment";
import LandingPageEquipment from "../pages/LandingPageEquipment";
import LandingPageModelEquipment from "../pages/landingPageModelEquiment";
import Signup from "../pages/signup";
import DetailPageTicket from "../pages/ticket";
import LandPageAdmin from "../pages/landingPageAdmin";
import Users from "../pages/users";
import { ReportTicket } from "../pages/reportTicket";
import LandingPageTicket from "../pages/landingPageTicket";

const RoutesApp = () => {
    return (
      <div className="App">
        <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="users" element={<Users/>} />
          <Route path="report" element={<ReportTicket />} />

          <Route path="equipments" element={<LandingPageEquipment />} />
          <Route path="equipments/:id" element={<DetailPageEquipment />} />
          <Route path="addEquipment" element={<CreatEquipment />} />
          <Route path="editEquipment/:id" element={<EditEquipment/>} />


          <Route path="modelsEquipment" element={<LandingPageModelEquipment />} />
          <Route path="modelsEquipment/:id" element={<DetailPageModelEquipment />} />
          <Route path="addModelEquipment" element={<CreateModelEquipment />} />
          <Route path="editModelEquipment/:id" element={<EditModelEquipment />} />

          <Route path="admin" element={<LandPageAdmin />} />
          <Route path="tickets" element={<LandingPageTicket />} />
          <Route path="tickets/:id" element={<DetailPageTicket />} />
          <Route path="add" element={<CreateTicket />} />

        </Routes>
      </div>
    );
  }
  
export default RoutesApp;