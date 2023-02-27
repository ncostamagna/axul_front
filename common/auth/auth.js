import { useEffect, useState } from "react";
import Router from "next/router";
import Spinner from "@/components/Spinner/Spinner";

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const [spinner, setSpinner] = useState(true);
    /*
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        
      }
    }*/

    useEffect(() => {
      window.localStorage.setItem("lala", 123);
      setSpinner(false);
    }, []);

    return spinner == true ? <Spinner /> : <Component {...props} />;
  };

  return Wrapper;
};
