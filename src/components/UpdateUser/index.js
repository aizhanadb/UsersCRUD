import { Modal, Form, Button } from "react-bootstrap";

const UpdateUser = ({
  modal,
  setModal,
  currentUser,
  setCurrentUser,
  updateUser
}) => {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
    // console.log("it is currentUser", currentUser.id, currentUser);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!currentUser.firstname || !currentUser.lastname) return;
    updateUser(currentUser);
    console.log(currentUser);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={onInputChange}
              defaultValue={currentUser.firstname}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={onInputChange}
              defaultValue={currentUser.lastname}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={onInputChange}
              defaultValue={currentUser.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Avatar URL"
              name="vatar"
              onChange={onInputChange}
              defaultValue={currentUser.vatar}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Birth date"
              name="birthdate"
              onChange={onInputChange}
              defaultValue={currentUser.birthdate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModal({ active: false })}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Update User
        </Button>
      </Modal.Footer>
    </>
  );
};

export default UpdateUser;
