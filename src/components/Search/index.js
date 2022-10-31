import { Form } from "react-bootstrap";

function Search({ setValue }) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Search user</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name.."
          onChange={(e) => setValue(e.target.value)}
          // value={value}
        />
      </Form.Group>
    </Form>
  );
}

export default Search;
