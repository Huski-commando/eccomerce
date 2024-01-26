import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { deleteObject, ref } from "firebase/storage";

import Container from "../hoc/Container";
import { db, storage } from "../../firebase/config";
import AdminViewProductLoader from "../../utilities/skeletonLoaders/AdminViewProductLoader";
import ProductTable from "./ProductTable";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

const ViewAdminProducts = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");

  // storing data in redux store
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  // fetching data from redux store
  const products = useSelector((state) => state.product.products);
  // console.log(products);

  const deleteSingleProduct = async (id, imageLink) => {
    // console.log();
    try {
      await deleteDoc(doc(db, "products", id));

      // Create a reference to the file to delete
      const productRef = ref(storage, imageLink);
      // Delete the file
      await deleteObject(productRef);

      toast.success("Product deleted Successfully.");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <Container className="bg-base-100 overflow-auto">
      <>
        {isLoading && <AdminViewProductLoader />}
        <div className="sm:w-[500px] lg:w-[800px] xl:w-[1400px]">
          {products.length === 0 ? (
            <h1 className="text-center mt-10 font-bold text-lg tracking-wider">
              No Product Found
            </h1>
          ) : (
            <ProductTable
              products={products}
              deleteProduct={deleteSingleProduct}
            />
          )}
        </div>
      </>
    </Container>
  );
};

export default ViewAdminProducts;
