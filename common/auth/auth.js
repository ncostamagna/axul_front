import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
      window.localStorage.setItem("lala", 123);
      setSpinner(false);
      console.log("entra");
    }, []);

    return spinner == true ? <Spinner /> : <Component {...props} />;
  };

  return Wrapper;
};
