import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <div className="loader-body">
      <div className="loader-container">
        <div className="loader-label">
          <CircularProgress size={80} />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
