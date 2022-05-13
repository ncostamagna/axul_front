import React, {useState} from 'react';
import { Container, Row,  Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import ContactSearch from './Search'
import ContactView from './View'
const Contact = () => {

  const [operation, setOperation] = useState('SEARCH');
  const [contacts, setContacts] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <div>
    <Menu></Menu>
    {router(operation, setOperation, contacts,setContacts,index, setIndex)}
    </div>
  );
}

const router = (operation, setOperation, contacts,setContacts,index, setIndex) => {

  switch (operation) {
    case 'SEARCH':
      return <ContactSearch setOperation={setOperation} setContacts={setContacts} setIndex={setIndex}/>
    case 'ADD':
      return <ContactView setOperation={setOperation} contacts={contacts} setContacts={setContacts}/>
    case 'VIEW':
      return <ContactView setOperation={setOperation} contacts={contacts} index={index}/>
  }
  return
}
export default Contact;
