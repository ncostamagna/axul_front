import React, {useEffect} from 'react';
import { Container, Row,  Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import {Contacts} from '../../util/api'
import {useState} from 'react'

const birhtdayStyle = (days) => {
  
  let popup = {
    backgroundColor: "rgba(255,255,255,.95)",
    };

  console.log(days)
  switch (days) {
    case 0:
      console.log("entra")
      popup['backgroundColor'] = "rgba(64,167,0,.15)";
      break;
  
    default:
      break;
  }

  return popup
  
}

const socialWA = (days, nickname, phone) => {

  if (days == 0) {
    return  <a href={`whatsapp://send?text=${nickname}%20muuuy%20feliz%20cumple!!%0AEspero%20que%20lo%20disfrutes%20al%20maximo%20en%20tu%20dia!!%0ATe%20deseo%20lo%20mejor%20para%20este%20nuevo%20año!!%0AMuchos%20exitooos!!%20:)&phone=${phone}`} className="social-link mt-1 align-middle"><i className="fa fa-whatsapp"></i></a>
  }

  return <li className="list-inline-item"></li>
}

function Home() {
  const [contacts, setContacts] = useState([]);
  useEffect( () => {

    let token = localStorage.getItem("axul_user_token");
    let user_id = localStorage.getItem("axul_user_id");

    const contactApi = new Contacts();
    console.log("test")
    contactApi.getByDays(30,token,user_id)
    .then(async (response) => {
      console.log("Entra")
      setContacts(response.data.data);
    })
    .catch(async (err) =>{
      console.log("Entra por error 3");
      localStorage.removeItem("axul_user_token");
      localStorage.removeItem("axul_user_id");

  })}, [])

  console.log(contacts)
  return (
    <div>
    <Menu></Menu>
    <Container>
      <Row className='mt-3 d-flex '>
        { 
        contacts.map(c => 
          <div key={c.id} className="col-12 mb-5">
            <div className="rounded shadow-sm py-4 px-4" style={birhtdayStyle(c.days)}>
              <Row>
                <div className="col-9">
                <h5 className="mb-0">{c.firstname + " " + c.lastname}</h5><span className="small text-muted h5">{birthdayFormat(c.birthday, c.days)}</span>
              </div>
              <div className="col-3">
                {
                  socialWA(c.days, c.nickname, c.phone)
                }
              </div>
              
              </Row>
              
            </div>
          </div>
          ) 
        }
      </Row>
    </Container>
    </div>
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



export default Home;
