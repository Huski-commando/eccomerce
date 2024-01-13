import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <CircularProgress />
    </div>
  );
};

export default Loader;
