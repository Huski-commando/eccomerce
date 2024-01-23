import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductTable = ({ products }) => {
  //   console.log(products);
  return (
    <>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>S/N</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PRODUCT IMAGE</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>BRAND</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                PRICE (&#x20B9;)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>QUANTITY</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              const {
                id,
                brand,
                category,
                imageLink,
                price,
                productName,
                quantity,
              } = product;
              return (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div style={{ width: "60px", height: "50px" }}>
                      <img
                        src={imageLink}
                        alt={productName}
                        className="w-full h-full object-fit"
                      />
                    </div>
                  </TableCell>
                  <TableCell sx={{ width: "200px" }}>{productName}</TableCell>
                  <TableCell>{brand}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>&#x20B9; {price}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link to={`/admin/editProduct`}>
                        <FaEdit
                          size="20"
                          className="cursor-pointer text-green-700"
                        />
                      </Link>

                      <MdDeleteForever
                        size="20"
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
