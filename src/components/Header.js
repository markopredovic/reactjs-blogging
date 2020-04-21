import React, { Fragment, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../context/appContext";
import { FaUser, FaSignOutAlt, FaFileAlt, FaHome } from "react-icons/fa";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand as={Link} to="/">
            Kalifornijske gliste
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/" exact>
                <FaHome style={{ fontSize: "24px" }} />
              </Nav.Link>
              <Nav.Link as={NavLink} to="/posts" exact>
                Blog
              </Nav.Link>
            </Nav>
            <Nav>
              {!!context.token ? (
                <NavDropdown
                  alignRight={true}
                  title={context.user ? context.user.name : "not looged in"}
                  id="dashboard"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    <FaUser /> Profil
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/my-posts">
                    <FaFileAlt /> Moji postovi
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/logout">
                    <FaSignOutAlt /> Izloguj se
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Fragment>
                  <Nav.Link as={NavLink} to="/signup">
                    Registracija
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Uloguj se
                  </Nav.Link>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
