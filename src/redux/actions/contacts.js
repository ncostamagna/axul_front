import {
    CONTACTS
} from '../types';
import {Users} from '../../util/api'
import { loading } from './loading';


import React, {useEffect} from 'react';
import { Container, Row,  Col} from 'react-bootstrap';
import Menu from '../../components/menu';
import {Contacts} from '../../util/api'
import {useState} from 'react'


import { useDispatch } from 'react-redux';



export function getContactsAction(firstname, lastname, month) {
    return async (dispatch) => {
        dispatch(loading(true))

        let token = localStorage.getItem("axul_user_token");
        let user_id = localStorage.getItem("axul_user_id");
        const contactApi = new Contacts();

        contactApi.getByDays(30,token,user_id)
        .then(async (response) => {

            dispatch( setContacts(response.data.data))
            dispatch(loading(false))

        })
        .catch(async (err) =>{
        localStorage.removeItem("axul_user_token");
        localStorage.removeItem("axul_user_id");
        dispatch(loading(false))


        })

    
    }
}


const setContacts = (contacts) => ({
    type: CONTACTS,
    payload: {contacts}
});
