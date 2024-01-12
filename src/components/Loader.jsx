import React from "react";

import LinearProgress from "@mui/material/LinearProgress";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <LinearProgress />
    </div>
  );
};

export default Loader;
