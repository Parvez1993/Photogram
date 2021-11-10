import React from "react";
import { Container, Nav, Button, Popover } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "./Context";

function NavbarBootstrap() {
  const { user, logout } = useAuth();

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Photogram</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link className="my-2">
              <Link to="/" className="white">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="my-2">
              <Link to="/gallery" className="white">
                Gallery
              </Link>
            </Nav.Link>
            {user ? (
              <Nav.Link className="my-2">
                <Link to="/dashboard" className="white">
                  Profile
                </Link>
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link className="d-flex align-center">
              {user ? (
                <Button variant="primary" size="lg" onClick={signOut}>
                  Sign out
                </Button>
              ) : (
                <Link to="/signin">
                  <Button variant="primary" size="lg">
                    Sign in
                  </Button>
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBootstrap;
