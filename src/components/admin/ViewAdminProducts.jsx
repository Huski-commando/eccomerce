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
import ProductTable from "./ProductTable";
import AdminViewProductLoader from "../../utilities/skeletonLoaders/AdminViewProductLoader";
import { deleteObject, ref } from "firebase/storage";

const ViewAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef);

      onSnapshot(q, (snapshot) => {
        const updatedProducts = snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts);
        setIsLoading(false);
        // console.log(snapshot);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);
  const deleteSingleProduct = async (id, imageLink) => {
    try {
      await deleteDoc(doc(db, "products", id));

      // Create a reference to the file to delete
      const storageRef = ref(storage, imageLink);

      // Delete the file
      await deleteObject(storageRef);
      toast.success("Product deleted Successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="bg-base-100 overflow-auto">
      <>
        <div className="sm:w-[500px] lg:w-[800px] xl:w-[1400px]">
          <ProductTable
            products={products}
            deleteProduct={deleteSingleProduct}
          />
        </div>
        {isLoading && <AdminViewProductLoader />}
      </>
    </Container>
  );
};

export default ViewAdminProducts;
