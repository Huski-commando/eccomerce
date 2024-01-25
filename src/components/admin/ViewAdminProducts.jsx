import React, { useEffect, useState } from "react";
import Container from "../hoc/Container";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
// import ProductTable from "./ProductTable";
import AdminViewProductLoader from "../../utilities/skeletonLoaders/AdminViewProductLoader";
import { deleteObject, ref } from "firebase/storage";

import ProductTable from "./ProductTable";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";

const ViewAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc")); // Order by createdAt in descending order

      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);

  const deleteSingleProduct = async (id, imageLink) => {
    // console.log();
    try {
      // console.log("Deleting document from Fire store:", id);
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
