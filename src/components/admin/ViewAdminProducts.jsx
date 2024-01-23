import React, { useEffect, useState } from "react";
import Container from "../hoc/Container";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import ProductTable from "./ProductTable";
import Loader from "../Loader";
import ViewProductSkeleton from "../../utilities/skeletonLoaders/ViewProductSkeleton";
import AdminViewProductLoader from "../../utilities/skeletonLoaders/AdminViewProductLoader";

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

  return (
    <Container className="bg-base-100 overflow-auto">
      <>
        <div className="sm:w-[500px] lg:w-[800px] xl:w-[1200px]">
          <ProductTable products={products} />
        </div>
        {isLoading && <AdminViewProductLoader />}
      </>
    </Container>
  );
};

export default ViewAdminProducts;
