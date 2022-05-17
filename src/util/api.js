import * as axios from "axios";

class Contacts {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";
  }

  init = (token) => {
    this.api_token = "MI TOKEN"
    let headers = {
      Accept: "application/json"
    };
    if (this.api_token) {
      headers.Authorization = token;
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  get = (firstname, lastname, month, token, userID) => {
    let path = "";

    if (firstname !== "" && firstname != null){
      path = `${path}firstname=${firstname}&`
    }

    if (month !== 0 && month != null){
      path = `${path}month=${month}&`;
    }

    if (lastname !== 0 && lastname != null){
      path = `${path}month=${lastname}&`;
    }

    console.log(`GET /contacts${path}`)
    return this.init(token).get(`/contacts?${path}userid=${userID}`);
  };

  getByDays = (days, token, userID) => {
    console.log(`GET /contacts?days=${days}`)
    return this.init(token).get(`/contacts?days=${days}&userid=${userID}`);
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
    this.api_url = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";
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
    this.api_url = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";
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








