import axios from "axios";

const BACK_URL = process.env.USER_HOST_URL;

export type User = {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  password?: string;
  email: string;
  phone: string;
};

export type Login = {
  user: User;
  token: string;
  authorization: number;
};

type LoginResponse = {
  data: Login;
};

export const userLogin = async (
  username: string,
  password: string
): Promise<Login> => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  };

  const response = await axios.post<LoginResponse>(
    `${BACK_URL}/users/login`,
    { username, password },
    options
  );

  return response.data.data;
};

export const getProfile = async (
  token: string | null,
  userID: string | null
): Promise<Login> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const response = await axios.get<LoginResponse>(
    `${BACK_URL}/users/${userID}/token/${token}`,
    options
  );

  return response.data.data;
};
