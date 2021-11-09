import React from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./Context";

function Gallery() {
  const { images, user } = useAuth();

  const getTime = (time) => {
    var dateTime = new Date(time * 1000).toDateString().slice(0, 10);
    return dateTime;
  };
  return (
    <>
      <Container>
        <h2 className="text-center my-5 py-5">
          Welcome to the sweetest memories shared by our user
        </h2>
        <Row>
          {images.length > 0 ? (
            images.map((itemz, id) => {
              return (
                <Col
                  lg={3}
                  md={6}
                  sm={6}
                  xs={8}
                  className="py-2 mx-auto"
                  key={id}
                >
                  {" "}
                  <Card style={{ width: "20rem" }}>
                    <Card.Img
                      variant="top"
                      src={itemz.url}
                      style={{ height: "18rem" }}
                    />
                    <Card.Body>
                      <Card.Text>
                        <p style={{ fontSize: "18px" }}>{itemz.caption}</p>
                        <h6>
                          Upload by{" "}
                          {user ? (
                            itemz.displayName
                          ) : (
                            <span style={{ color: "red" }}>Sign in to see</span>
                          )}
                        </h6>
                        <small
                          className="text-muted"
                          style={{ fontSize: "10px" }}
                        >
                          {getTime(itemz.createdAt)}
                        </small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
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

export default Gallery;
