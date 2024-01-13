import React, { memo, useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default memo(Title);
