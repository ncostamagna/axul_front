import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import Login from "@/pages/login";

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const [spinner, setSpinner] = useState(true);
    const [login, setLogin] = useState(false);

    useEffect(() => {
      setSpinner(false);
      console.log("entra");
      const userID = window.localStorage.getItem("axul_user_id");
      const token = window.localStorage.getItem("axul_token");
      if (userID != null && userID != "" && token != null && token != "") {
        setLogin(true);
      }
    }, []);

    return spinner == true ? (
      <Spinner />
    ) : login ? (
      <Component {...props} />
    ) : (
      <Login />
    );
  };

  return Wrapper;
};
