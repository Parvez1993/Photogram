import React from "react";
import { Alert, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

function UserImageCollection(props) {
  const { images } = props;
  console.log(images);

  const getTime = (time) => {
    var dateTime = new Date(time * 1000).toDateString().slice(0, 10);
    console.log(dateTime);
    return dateTime;
  };

  return (
    <>
      <Container>
        <Row>
          {images.length > 0 ? (
            images.map((item, id) => {
              return (
                <Col
                  lg={3}
                  md={6}
                  sm={6}
                  xs={8}
                  className="py-2 mx-auto"
                  key={id}
                >
                  <Link to={`/dashboard/${item.id}`}>
                    {" "}
                    <Card style={{ width: "20rem" }}>
                      <Card.Img
                        variant="top"
                        src={item.url}
                        style={{ height: "18rem" }}
                      />
                      <Card.Body>
                        <Card.Text>
                          <p style={{ fontSize: "18px" }}>{item.caption}</p>
                          <small
                            className="text-muted"
                            style={{ fontSize: "10px" }}
                          >
                            {getTime(item.createdAt)}
                          </small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })
          ) : (
            <Alert variant="warning" className="my-5 py-5">
              <Alert.Heading className="text-center">Hey, Friend</Alert.Heading>
              <p className="text-center">
                You have no memories :( Please upload your sweetest memories
              </p>
            </Alert>
          )}
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default UserImageCollection;
