import React from "react";
import { Container, Nav, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

function NavbarBootstrap() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="my-2">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="d-flex align-center">
              <Button variant="primary">Sign In</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBootstrap;
