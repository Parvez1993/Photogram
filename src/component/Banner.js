import React from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import banner from "../images/banner.png";
import styled from "styled-components";
import blob from "../images/blog.svg";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <Wrapper>
      <div className="banner">
        <Container className="container">
          <Row>
            <Col
              xl={6}
              lg={6}
              md={{ order: 2, span: 12 }}
              sm={{ order: 2, span: 12 }}
              xs={{ order: 2, span: 12 }}
            >
              <div className="image">
                <img src={banner} alt="bannerimage" className="banner_image" />
              </div>
            </Col>
            <Col>
              <div className="text">
                <div className="sub">
                  <p>Memories are stored not deleted !!!</p>
                </div>
                <div className="heading ">
                  <h1 className="heading__text">Click, Share & Spread Joy</h1>
                </div>
                <div className="button">
                  <Link to="/signup">
                    <Button variant="primary" size="lg">
                      Sign up
                    </Button>
                  </Link>
                </div>
                <div>
                  <img src={blob} alt="blob" className="blob" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .banner {
    background: rgb(131, 58, 180);
    background: linear-gradient(
      90deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(255, 218, 218, 1) 50%,
      rgba(67, 10, 200, 1) 100%
    );
    height: 100vh;
    padding: 100px 0;
    @media screen and (min-width: 991.99px) and (max-width: 1920px) {
      overflow-y: none;
    }
  }
  .image {
    width: 100%;
    .banner_image {
      width: 100%;
      @media screen and (min-width: 500px) and (max-width: 991.99px) {
        width: 55% !important;
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 20px;
    z-index: 1;
    position: relative;
    font-size: 1rem !important;
    padding: 20px;

    @media screen and (max-width: 500.999px) {
      .heading__text {
        font-size: 200% !important;
      }
    }

    .sub {
      color: var(--darkpink);
      font-weight: bold;
      word-spacing: 1em;
    }
    .blob {
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      transform: translate(-20%, -20%);
    }
  }
`;
export default Banner;
