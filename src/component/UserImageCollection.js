import React, { useState } from "react";
import { Alert, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./Context";

function UserImageCollection(props) {
  const { temp, setTemp } = useState([]);
  const { user } = useAuth();
  const { images } = props;
  let newItem;
  const getTime = (time) => {
    var dateTime = new Date(time * 1000).toDateString().slice(0, 10);
    return dateTime;
  };

  return (
    <>
      <Container>
        <Row>
          {images.length > 0 ? (
            images
              .filter((item) => item.userId === user.uid)
              .map((itemz, id) => {
                return (
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={8}
                    className="py-2 mx-auto"
                    key={id}
                  >
                    <Link to={`/dashboard/${itemz.id}`}>
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
                            <small
                              className="text-muted"
                              style={{ fontSize: "10px" }}
                            >
                              {getTime(itemz.createdAt)}
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
