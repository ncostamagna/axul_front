import * as axios from "axios";

class Contacts {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://3c5c-181-28-190-29.ngrok.io";
  }

  init = () => {
    let headers = {
      Accept: "application/json",
      id: "6b9b1014-05be-4d51-a695-59e2cc5eb2bd",
      token: "e83579c7d08bdfe7ef4a7383565bd66efdf1089ffdff6f99dc77b0a5eadbb5fdf6e12ce63f47b533b2478d17aebb8967720cc06c39cc749c85534cbcb609793fa884a64ace5275b5388246f0a3568f584b14c7db7d9777c683f81f4e2984221a57ed1af9bc8b9ff88a6ff3c45b884e3b6cc2ed99b4904a1899029b254cc04fdf0c77f28cf37daedf735bf80e81d2b2b212d3beb70ceaa3e9e86beb5b439428859e17be5c07d4a0e655a3d7572a049f40d5446ea2258571e9427c542a05cdf1dc6478fbaace95299d36b822"
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
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

  getByDays = (days) => {
    console.log(`GET /contacts?days=${days}`)
    return this.init().get(`/contacts?days=${days}`);
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








