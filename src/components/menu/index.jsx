import React from 'react';
import { Container, Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
function Menu() {
  return (

<Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
  
        <Link to={"/"}
                className="btn  d-block d-md-inline-block">Home</Link>
  
        <Link to={"/contacts"}
                className="btn  d-block d-md-inline-block">Contact</Link>
  

      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>
      


  );
}

export default Menu;
