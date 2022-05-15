import React from 'react';
import { Container, Form, Button} from 'react-bootstrap';

const ContactSearch = ({setOperation}) => {
  
    let click = () => {
        console.log("Entra");
        setOperation("ADD");
    }

    let search = (e) => {
        e.preventDefault();
        console.log("Search")
    }
  return (
    <Container>
    <Form className="mt-3" onSubmit={search}>

  <Form.Group className="mb-3" lg={6} controlId="formFirstName">
    <Form.Label>First Name test</Form.Label>
    <Form.Control type="firstName" placeholder="Enter first name" />
  </Form.Group>

  <Form.Group className="mb-3" lg={6} controlId="formLastName">
    <Form.Label>Last Name test</Form.Label>
    <Form.Control type="firstName" placeholder="Enter first name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formMonth">
    <Form.Label>Month</Form.Label>
    <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Test CI</option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Search
  </Button>
    </Form>
    </Container>
  );
}

export default ContactSearch;
