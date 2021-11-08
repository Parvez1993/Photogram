import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "./Context";

function EditModal(props) {
  const { id } = props;
  const [newCaption, setNewCaption] = useState("");
  const { user, updateForm } = useAuth();

  const handleEdit = async () => {
    try {
      await updateForm(id, newCaption);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4>No probs !!! You can change anytime</h4>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="new caption"
            onChange={(e) => setNewCaption(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleEdit} variant="warning">
          Edit
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
