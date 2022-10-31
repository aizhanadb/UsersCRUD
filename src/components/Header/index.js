import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar variant="dark" bg="dark" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">React Users CRUD</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
