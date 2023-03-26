import axios from "axios";

const BACK_URL = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";

export type User = {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};

export type Login = {
  user: User;
  token: string;
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
