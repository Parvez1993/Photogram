import React from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import banner from "../images/banner.png";
import styled from "styled-components";
import blob from "../images/blog.svg";
function Banner() {
  return (
    <div>
      <Wrapper>
        <Container>
          {" "}
          <Row>
            <Col
              lg={6}
              md={{ order: 2, span: 12 }}
              sm={{ order: 2, span: 12 }}
              xs={{ order: 2, span: 12 }}
            >
              <div className="image">
                <Image src={banner} alt="bannerimage" width="80%" />
              </div>
            </Col>
            <Col>
              <div className="text">
                <div className="sub">Memories stored not deleted !!!</div>
                <div className="heading">
                  <h1>Click, Share and Spread Joy</h1>
                </div>
                <div className="button">
                  <Button variant="secondary" size="lg">
                    Sign up
                  </Button>
                </div>
                <div className="blob">
                  <img src={blob} alt="blob" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(255, 218, 218, 1) 50%,
    rgba(67, 10, 200, 1) 100%
  );
  padding: 10% 0;
  height: 90vh;
  .text {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    row-gap: 20px;
    .sub {
      color: white;
    }
    .blob {
      z-index: 1;
      top: 0;
    }
  }
`;
export default Banner;
