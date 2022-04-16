import * as axios from "axios";

class Contacts {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://ec2-54-211-247-153.compute-1.amazonaws.com:8083";
  }

  init = () => {
    let headers = {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      mode: 'no-cors',
      headers: headers,
    });

    return this.client;
  };

  get = (contact, headers) => {
    const {name, month} = contact
    let path = "";

    if (name !== ""){
      path = path ===""?"?":`${path}&`
      path = `${path}name=${name}`
    }

    if (month !== 0){
      path = path ===""?"?":`${path}&`
      path = `${path}month=${month}`;
    }

    console.log(`GET /contacts${path}`)
    return this.init().get(`/contacts${path}`, {headers});
  };

  getByDays = (days, headers) => {
    console.log(`GET /contacts?days=${days}`)
    return this.init().get(`/contacts?days=${days}`, {headers});
  };

  create = (body, headers) => {
    console.log(`POST /contacts`)
    return this.init().post("/contacts", body, {headers});
  }

}

class Events {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://ec2-54-211-247-153.compute-1.amazonaws.com:8082";
  }

  init = () => {

    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  get = (data, headers) => {
    let url = '/events'
    if (data.expired === 1) {
      url = `${url}?expired=1`
    } 

    console.log(`GET ${url}`)
    console.log(headers)
    return this.init().get(url,{headers});
  };

  getByDays = (days, headers) => {
    console.log(`GET /events?days=${days}`)
    console.log(headers)
    return this.init().get(`/events?days=${days}`, {headers});
  };

  create = (body, headers) => {
    console.log(`POST /events`)
    return this.init().post("/events", body, {headers});
  }

}

class Users {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://ec2-54-211-247-153.compute-1.amazonaws.com:8081";
  }

  init = () => {
    this.api_token = "MI TOKEN"

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  get = (params) => {
    console.log(`GET /users`)
    return this.init().get("/users", { params: params });
  };

  login = (body) => {
    console.log(`POST /users/login`)
    return this.init().post("/users/login", body);
  };

  token = (userID, token) => {
    let url = `/users/${userID}/token/${token}`
    console.log(`POST ${url}`)
    return this.init().get(url);
  };

  create = (body) => {
    console.log(`POST /users`)
    return this.init().post("/users", body);
  }

}

export {Contacts, Events, Users}