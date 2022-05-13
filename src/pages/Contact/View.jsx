import React from 'react';
import { Container, Row,  Col, Button} from 'react-bootstrap';

const ContactView = ({setOperation}) => {
  
    let click = () => {
        setOperation("SEARCH");
    }
  return (
    <Container>
    <Row> <Col>
    View</Col><Col><Button onClick={click} /></Col></Row>
    </Container>
  );
}

export default ContactView;