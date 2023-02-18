import axios from "axios";

const BACK_URL = "https://pe0t1xcxad.execute-api.us-east-1.amazonaws.com/prod";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  days: number;
  birthday: string;
};

type GetUsersResponse = {
  data: User[];
};

export const getNextBirthday = async (
  days = 4,
  token: string,
  userID: string
): Promise<User[]> => {
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
