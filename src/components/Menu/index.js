import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './style.css'; 

function Menu() {
  return (
    <>
      <Navbar expand="lg" collapseOnSelect style={{ background: '#267987'}}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <h4>HOME</h4>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/consultaupload">
                <Nav.Link>
                  <strong>UPLOAD DE PLANILHA</strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/consultahabilidade">
                <Nav.Link>
                  <strong>CADASTRO DE HABILIDADE</strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/consultacaed">
                <Nav.Link>
                  <strong>CONSULTA CAED</strong>
                </Nav.Link>
              </LinkContainer>   
              <LinkContainer to="/resultadocaed">
                <Nav.Link>
                  <strong>RESULTADO CAED</strong>
                </Nav.Link>
              </LinkContainer> 
              <LinkContainer to="/consultaquestionario">
                <Nav.Link>
                  <strong>QUESTIONÁRIO</strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/resultadoquestionario">
                <Nav.Link>
                  <strong>RESULTADO QUESTIONÁRIO</strong>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ajuda">
                <Nav.Link>
                  <strong>AJUDA</strong>
                </Nav.Link>
              </LinkContainer>                         
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;