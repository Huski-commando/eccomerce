import React, { useEffect, useState } from "react";
import Container from "../hoc/Container";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";

const ViewAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef);

      onSnapshot(q, (snapshot) => {
        const updatedProducts = snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts);
        // console.log(snapshot);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return <Container className="">ViewAdminProducts</Container>;
};

export default ViewAdminProducts;
