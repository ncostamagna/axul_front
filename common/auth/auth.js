import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import Login from "@/pages/login";
import { useRouter } from "next/router";

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const [spinner, setSpinner] = useState(true);
    const [login, setLogin] = useState(false);
    const router = useRouter();
    useEffect(() => {
      console.log("entra");
      const userID = window.localStorage.getItem("axul_user_id");
      const token = window.localStorage.getItem("axul_token");
      if (userID != null && userID != "" && token != null && token != "") {
        setSpinner(false);
      } else {
        router.push(`/login`);
      }
    }, []);

    return spinner == true ? <Spinner /> : <Component {...props} />;
  };

  return Wrapper;
};
