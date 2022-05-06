import React, {useEffect} from 'react';
import { Container, Row,  Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import {Contacts} from '../../util/api'
import {useState} from 'react'

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

  })
  }, [])

  console.log(contacts)
  return (
    <div>
    <Menu></Menu>
    <Container>
    <Row className='text-center'>
      { 
      contacts.map(c => <div key={c.id} class="col-xl-3 col-sm-6 mb-5">
            <div class="bg-white rounded shadow-sm py-5 px-4">
              <img src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm mx-auto" />
                <h5 class="mb-0">{c.firstname + " " + c.lastname}</h5><span class="small text-uppercase text-muted">{c.birthday}</span>
                <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      <a href={`whatsapp://send?text=${c.nickname}%20muuuy%20feliz%20cumple!!%0AEspero%20que%20lo%20disfrutes%20al%20maximo%20en%20tu%20dia!!%0ATe%20deseo%20lo%20mejor%20para%20este%20nuevo%20año!!%0AMuchos%20exitooos!!%20:)&phone=${c.phone}`} class="social-link"><i class="fa fa-whatsapp"></i></a>
                    </li>
                </ul>
            </div>
          </div>
        ) 
      }

      
      </Row>
    </Container>
    </div>
  );
}

export default Home;
