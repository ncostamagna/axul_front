import axios from "axios";

const BACK_URL = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  days: number;
  birthday: string;
};

type GetUsersResponse = {
  data: {
    data: User[];
  };
};

export const getNextBirthday = async (
  days = 4,
  token: string,
  userID: string
): Promise<any> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  const response = await axios.get<GetUsersResponse>(
    `${BACK_URL}/contacts?userid=${userID}&days=${days}`,
    options
  );

  console.log(response);
  console.log(response.data.data);
  return response.data.data;
};
/*
class Contacts {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "";
  }

  init = (token) => {
    this.api_token = "MI TOKEN";
    let headers = {
      Accept: "application/json",
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

    if (firstname !== "" && firstname != null) {
      path = `${path}firstname=${firstname}&`;
    }

    if (month !== 0 && month != null) {
      path = `${path}month=${month}&`;
    }

    if (lastname !== 0 && lastname != null) {
      path = `${path}month=${lastname}&`;
    }

    console.log(`GET /contacts${path}`);
    return this.init(token).get(`/contacts?${path}userid=${userID}`);
  };

  getByDays = (days, token, userID) => {
    console.log(`GET /contacts?days=${days}`);
    return this.init(token).get(`/contacts?days=${days}&userid=${userID}`);
  };

  create = (body, headers) => {
    console.log(`POST /contacts`);
    return this.init().post("/contacts", body, { headers });
  };
}

//initialize unsplash

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};
*/
