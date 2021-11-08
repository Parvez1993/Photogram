import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Header, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import { useAuth } from "../component/Context";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  const handeSubmit = async (e) => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Header as="h2" icon textAlign="center" className="header">
            <Icon name="sign-in" circular />
            <Header.Content>Sign In Mate !!!</Header.Content>
          </Header>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="email"
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </Form.Group>

            <div className="submit">
              <Button
                variant="primary"
                className="submit__btn"
                onClick={handeSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Wrapper>
      </Container>
    </>
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
export default Signin;
