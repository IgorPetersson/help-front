import { Navbar, Nav } from "react-bootstrap";
import "./index.css";

export const HeaderUser = () => {
  const handleLogout = () => {
    localStorage.removeItem("Access");
    localStorage.removeItem("AccessEmail");
  };
  const accessEmail = localStorage.getItem("AccessEmail");

  return (
    <Navbar
      collapseOnSelect
      style={{ backgroundColor: "black" }}
      variant="dark"
      expand="md"
    >
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="nav-container" activeKey={window.location.pathname}>
          
            <div className="div-container">
              <Nav.Link  style={{paddingLeft: "190px"}} href="/tickets">Chamados</Nav.Link>
              <Nav.Link href="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </div>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
