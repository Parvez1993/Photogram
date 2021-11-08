import React from "react";
import { Modal, Button, Form, ProgressBar, FormLabel } from "react-bootstrap";
import { useAuth } from "./Context";

function UploadModal(props) {
  const [file, setFile] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const { uploadphoto, progress } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadphoto(file, caption);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload an Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {progress ? (
            <ProgressBar now={progress} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Control
                size="lg"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/png,image/jpg,image/jpeg"
              ></Form.Control>
              <Form.Control
                as="textarea"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption for your memory"
                className="my-4"
                required
              ></Form.Control>
              <Button
                variant="primary"
                type="submit"
                onClick={props.onHides}
                size="lg"
              >
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ProgressBar now={60} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadModal;
