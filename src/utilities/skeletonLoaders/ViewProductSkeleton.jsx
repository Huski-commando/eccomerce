import React from "react";
import Skeleton from "@mui/material/Skeleton";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const ViewProductSkeleton = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width={30} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={60} height={40} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} height={30} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewProductSkeleton;
