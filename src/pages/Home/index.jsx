import React, {useEffect} from 'react';
import { Container, Row,  Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import {Contacts} from '../../util/api'

function Home() {
  let contacts = []; 

  useEffect( () => {

    const contactApi = new Contacts();
    console.log("test")
    contactApi.getByDays(30)
    .then(async (response) => {

        const c = response.data.data;
        console.log(c)

    })
  })
  return (
    <div>
    <Menu></Menu>
    <Container>
      { contacts.map(contact => <Row key={contact.id}> <Col> contact </Col></Row>) }
    </Container>
    </div>
  );
}

export default Home;
