import React from 'react';
import { Container, Form, Button, Row} from 'react-bootstrap';
import {Contacts} from '../../util/api'
import { ImBin,ImSearch,ImPlus } from "react-icons/im";

const ContactSearch = ({setOperation, setContacts, contacts}) => {
  
    let click = () => {
        setOperation("ADD");
    }

    let search = (e) => {
        e.preventDefault();

        let token = localStorage.getItem("axul_user_token");
        let user_id = localStorage.getItem("axul_user_id");

        const contactApi = new Contacts();
        contactApi.get(null, null, null, token,user_id)
        .then(async (response) => {
          setContacts(response.data.data)
        })
        .catch(async (err) =>{
          localStorage.removeItem("axul_user_token");
          localStorage.removeItem("axul_user_id");

      })
    }
  return (
    <Container>
    <Form className="mt-3" onSubmit={search}>

  <Form.Group className="mb-3" lg={6} controlId="formFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="firstName" placeholder="Enter first name" />
  </Form.Group>

  <Form.Group className="mb-3" lg={6} controlId="formLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="firstName" placeholder="Enter first name" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formMonth">
    <Form.Label>Month</Form.Label>
    <Form.Select aria-label="Default select example">
      <option value="0"></option>  
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10"> October</option>
      <option value="11"> November</option>
      <option value="12"> December</option>
    </Form.Select>
  </Form.Group>
  <Button variant="primary" type="submit" className='px-4 py-3 mx-1 principalButton'>
    <ImSearch></ImSearch>
  </Button>
  <Button variant="success" type="submit" className='px-4 py-3 mx-1 principalButton'>
    <ImPlus></ImPlus>
  </Button>
    </Form>

    <Row className='mt-3 d-flex '>
        { 
        contacts.map(c => 
          <div key={c.id} className="col-12 mb-2">
            <div className="rounded shadow-sm py-4 px-4">
              <Row>
                <div className="col-8">
                <h5 className="mb-0">{c.firstname + " " + c.lastname}</h5><span className="small text-muted h5">{birthdayFormat(c.birthday, c.days)}</span>
              </div>
              <div className="col-4">
                <Button className="optionButton btn-danger ml-1"><ImBin ></ImBin></Button><Button className="optionButton"><ImSearch></ImSearch></Button>
              </div>
              
              </Row>
              
            </div>
          </div>
          ) 
        }
      </Row>
    </Container>
  );
}


const birthdayFormat = (value, days) => {

  let date = value.split("T")[0];
  date = date.split("-");

  let daysLabel = ""
  switch (days) {
    case 1:
      daysLabel = "(1 Dia)"
      break;
    case 0:
      break;
    default:
      daysLabel = `(${days} Dias)`
      break;
  }
  return `${date[2]}/${date[1]} ${daysLabel}`
}

export default ContactSearch;
