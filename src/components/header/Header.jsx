import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" bg='primary'>
      <Container>
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" style={{ color: 'white' }}>Features</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: 'white' }}>Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" style={{ color: 'white' }}>More Info</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{ color: 'white' }}>
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


