import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "./Context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditModal from "./EditModal";

function SinglePic() {
  const navigate = useNavigate();
  const { images, user, deleteData } = useAuth();
  const [modalShow, setModalShow] = React.useState(false);
  let { slug } = useParams();
  let [singleImg, setSingleImg] = React.useState("");

  useEffect(() => {
    if (slug === "") {
      navigate("/dashboard");
    } else {
      let tempImg = images.filter((item) => item.id === slug);
      setSingleImg(tempImg[0]);
    }
  }, [singleImg, modalShow]);
  const getTime = (time) => {
    var dateTime = new Date(time * 1000).toDateString().slice(0, 10);
    console.log(dateTime);
    return dateTime;
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        {slug && singleImg && user ? (
          <Wrapper>
            <Row className="row">
              <Link to="/dashboard">
                <h2 size="lg" className="w-25 p-3">
                  Go Back
                </h2>
              </Link>
              <Col lg={6}>
                <img src={singleImg.url} alt="single" className="w-100" />
              </Col>
              <Col
                lg={4}
                offset={2}
                className="d-flex flex-column align-items-start justify-content-center "
              >
                <p className="text-uppercase">{singleImg.caption}</p>
                <p> Uploaded on: {getTime(singleImg.createdAt)}</p>
                <p>Upload by {user.email}</p>
                <div className="crud d-flex">
                  <Button
                    size="lg"
                    className="mx-2"
                    variant="success"
                    onClick={() => setModalShow(true)}
                  >
                    Edit
                  </Button>{" "}
                  <EditModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={singleImg.id}
                  />
                  <Button
                    size="lg"
                    className="mx-2"
                    variant="danger"
                    onClick={() => handleDelete(singleImg.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          </Wrapper>
        ) : (
          navigate("/dashboard")
        )}
      </Container>
    </>
  );
}

const Wrapper = styled.div`
  .row {
    height: 80vh;
    display: flex;
    align-items: center;
  }
`;

export default SinglePic;
