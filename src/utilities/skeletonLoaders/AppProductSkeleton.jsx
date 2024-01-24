import React from "react";
import Skeleton from "@mui/material/Skeleton";

const AppProductSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 py-14 px-16">
        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={40} />
        </div>

        <div>
          <Skeleton variant="text" width={300} height={30} />
          <Skeleton variant="rounded" width={300} height={130} />
        </div>
      </div>
      <div className="px-16">
        <Skeleton variant="rounded" width={200} height={40} />
      </div>
    </>
  );
};

export default AppProductSkeleton;
