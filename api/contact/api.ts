import axios from "axios";

const BACK_URL = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";

export type Contact = {
  id?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  days: number;
  phone: string;
  birthday: string;
};

type GetContactsResponse = {
  data: Contact[];
};
type StoreContactsResponse = {
  data: Contact;
};

export const getNextBirthday = async (
  days = 4,
  token: string,
  userID: string
): Promise<Contact[]> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  const response = await axios.get<GetContactsResponse>(
    `${BACK_URL}/contacts?userid=${userID}&days=${days}`,
    options
  );

  return response.data.data;
};

export const getAllContacts = async (
  token: string,
  userID: string,
  firstName: string,
  lastName: string,
  month: string
): Promise<Contact[]> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  let filter = "";

  if (firstName != "") {
    filter = `${filter}&firstname=${firstName}`;
  }

  if (lastName != "") {
    filter = `${filter}&lastname=${lastName}`;
  }

  if (month != "") {
    filter = `${filter}&month=${month}`;
  }

  const response = await axios.get<GetContactsResponse>(
    `${BACK_URL}/contacts?userid=${userID}&limit=1000${filter}`,
    options
  );

  return response.data.data;
};

export const createContact = async (
  token: string,
  userID: string,
  contact: Contact
): Promise<Contact> => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  let c = contact;
  delete c.id;

  const response = await axios.post<StoreContactsResponse>(
    `${BACK_URL}/contacts?userid=${userID}`,
    contact,
    options
  );

  return response.data.data;
};

export const updateContact = async (
  token: string,
  userID: string,
  contact: Contact
): Promise<Contact> => {
  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  let c = contact;
  const id = c.id;
  delete c.id;

  const response = await axios.patch<any>(
    `${BACK_URL}/contacts/${id}?userid=${userID}`,
    contact,
    options
  );

  return response.data.data;
};

export const deleteContact = async (
  token: string,
  userID: string,
  id: string
): Promise<Contact> => {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  const response = await axios.delete<any>(
    `${BACK_URL}/contacts/${id}?userid=${userID}`,
    options
  );

  return response.data.data;
};
