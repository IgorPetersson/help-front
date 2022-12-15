import { Navbar, Nav } from "react-bootstrap";
import './index.css'

export const HeaderAdmin = () => {
  const handleLogout = () => {
    localStorage.removeItem("Access");
    localStorage.removeItem("AccessEmail");
  };
  return (
    <Navbar collapseOnSelect style={{backgroundColor: "black"}} variant="dark" expand="md">
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="div-container">
        <Nav className="nav-container" activeKey={window.location.pathname}>
          <div className="nav-tags">
          <Nav.Link href="/admin">Chamados</Nav.Link>
          <Nav.Link href="/modelsEquipment">Modelos de Equipamentos</Nav.Link>
          <Nav.Link href="/equipments">Equipamentos</Nav.Link>
          <Nav.Link href="/users">Usuários</Nav.Link>
          <Nav.Link href="/report">Relatorio</Nav.Link>
          </div>

          <Nav.Link href="/" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
