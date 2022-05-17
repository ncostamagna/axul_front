import React, {useState} from 'react';
import { Container, Form,  Col, Button} from 'react-bootstrap';
import { ImUndo2,ImCheckmark } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContactView = ({setOperation}) => {
  const [startDate, setStartDate] = useState(new Date());
    let save = () => {
        setOperation("SEARCH");
    }
  return (
    <Container>
      <Form className="mt-3" onSubmit={save}>
        <Form.Group className="mb-3" lg={6} controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstName" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group className="mb-3" lg={6} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="lastName" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group className="mb-3" lg={6} controlId="formNickName">
          <Form.Label>Nick Name</Form.Label>
          <Form.Control type="nickName" placeholder="Enter nick name" />
        </Form.Group>

        <Form.Group className="mb-3" lg={6} controlId="formDay">
          <Form.Label>Day</Form.Label>
          <Form.Select aria-label="day">
            <option value="0"></option>  
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>  
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>  
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMonth">
          <Form.Label>Month</Form.Label>
          <Form.Select aria-label="Month">
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
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" lg={6} controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" placeholder="Enter phone" />
        </Form.Group>

        <Button variant="primary" type="submit" className='px-4 py-3 mx-1 principalButton'>
          <ImCheckmark></ImCheckmark>
        </Button>
        <Button variant="success" className='px-4 py-3 mx-1 principalButton'>
          <ImUndo2></ImUndo2>
        </Button>
      </Form>
    </Container>
  );
}

export default ContactView;