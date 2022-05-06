import { useState } from "react";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display: flex;
       align-items: center;
       justify-content: center;
       height: 100%;
       width: 100%;
       position: absolute;
`;

const popup = {
height: "100%",
width: "100%",
position: "absolute",
backgroundColor: "rgba(1,1,1,.95)",
zIndex: 9,
};

function Spinner() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={popup}>
      <PulseLoader className="align-middle" color="#FFFFFF" loading={loading} css={override} size={40} />
    </div>
  );
}

export default Spinner;