import React from "react";

import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Header, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import { useAuth } from "../component/Context";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { mesg, setMesg, signup } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMesg("Do not Match ");
    }
    try {
      await signup(email, password, username);
      navigate("/dashboard");
    } catch (error) {
      if (error) {
        return setMesg(error.message);
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <Header as="h2" icon textAlign="center" className="header">
          <Icon name="signup" circular />
          <Header.Content>Sign In Mate !!!</Header.Content>
          {mesg ? mesg : ""}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              className="email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="submit">
            <Button type="submit" variant="primary" className="submit__btn">
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
  .header {
    padding: 20px 0;
  }
  .email,
  .password {
    padding: 10px;
  }

  .submit {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 50px 0;
    .submit__btn {
      padding: 10px 20px;
      width: 200px;
    }
  }
`;
export default Signup;
