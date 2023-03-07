import axios from "axios";

const BACK_URL = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";

export type Contact = {
  id: string;
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

  const response = await axios.get<GetContactsResponse>(
    `${BACK_URL}/contacts?userid=${userID}&limit=1000`,
    options
  );

  return response.data.data;
};
