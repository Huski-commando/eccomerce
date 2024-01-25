import React, { useState } from "react";
import AddProductSkeleton from "../../utilities/skeletonLoaders/AppProductSkeleton";
import Container from "../hoc/Container";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const initialState = {
  productName: "",
  price: 0,
  quantity: 0,
  brand: "",
  description: "",
  imageLink: "",
  category: "",
};

const categories = [
  { id: nanoid(), name: "Laptop" },
  { id: nanoid(), name: "Electronics" },
  { id: nanoid(), name: "Fashion" },
  { id: nanoid(), name: "Phone" },
];

const AddProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `ecommerce/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setProduct({ ...product, imageLink: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(product);

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "products"), {
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        brand: product.brand,
        imageLink: product.imageLink,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setProduct({ ...initialState });
      toast.success("Product added successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <div className="bg-base-100 w-full h-full rounded-md px-6 py-6 text-neutral overflow-auto">
        <h1 className="text-2xl font-semibold underline py-2 px-4 tracking-wider text-secondary">
          Add New Product
        </h1>
        {isLoading ? (
          <AddProductSkeleton />
        ) : (
          <form onSubmit={addProduct}>
            <div className="grid grid-cols-1 lg:grid-cols-3 text-neutral gap-6 items-center">
              {/* product name */}
              <div className="flex flex-col justify-center gap-2 p-2">
                <label className="tracking-wider text-secondary">
                  Product Name:
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleInputChange(e)}
                  className="input input-bordered text-accent-content bg-neutral-content tracking-widest"
                />
              </div>
              {/* product price */}
              <div className="flex flex-col justify-center gap-2 p-2">
                <label className="tracking-wider text-secondary">
                  Product Price:
                </label>
                <input
                  type="number"
                  placeholder="Product Price"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleInputChange(e)}
                  className="input input-bordered text-accent-content bg-neutral-content tracking-widest"
                />
              </div>

              {/* quantity */}
              <div className="flex flex-col justify-between gap-2 p-2">
                <label className="tracking-wider text-secondary">
                  Product Quantity:
                </label>
                <input
                  type="Number"
                  placeholder="Enter Product Quantity"
                  required
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleInputChange(e)}
                  className="input input-bordered text-accent-content bg-neutral-content tracking-widest"
                />
              </div>

              {/* category */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2 w-full">
                <label className="tracking-wider text-secondary">
                  Product Category:
                </label>
                <div className="flex flex-col gap-1">
                  <select
                    required
                    name="category"
                    value={product.category}
                    onChange={(e) => handleInputChange(e)}
                    className="select w-full bg-neutral-content text-accent-content tracking-widest"
                  >
                    <option value="" disabled>
                      -- Choose Product Category
                    </option>

                    {categories.map((category) => {
                      return (
                        <option
                          value={category.name}
                          key={category.id}
                          className="text-accent-content bg-neutral-content tracking-widest"
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* product company/brand */}
              <div className="flex flex-col justify-between gap-2 p-2">
                <label className="text-secondary tracking-wider">
                  Product Company / Brand:
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Company / Brand"
                  required
                  name="brand"
                  value={product.brand}
                  onChange={(e) => handleInputChange(e)}
                  className="input input-bordered text-accent-content bg-neutral-content tracking-widest"
                />
              </div>

              {/* product image */}

              <div className="flex flex-col justify-between gap-2 p-2 border rounded-md">
                <label className="tracking-wider text-secondary">
                  Product Image:
                </label>
                <input
                  type="file"
                  placeholder="Product Image"
                  name="image"
                  className="border p-2 rounded-md text-accent-content tracking-widest bg-neutral-content"
                  onChange={(e) => handleImageChange(e)}
                />

                {product.imageLink === "" ? null : (
                  <input
                    type="text"
                    placeholder="Product Image URL"
                    name="imageLink"
                    value={product.imageLink}
                    className="bg-neutral-content border p-2 rounded-md text-accent-content tracking-widest"
                    disabled
                  />
                )}
              </div>
              <div className="flex flex-col justify-between gap-2 p-2">
                <label className="tracking-wider text-secondary">
                  Product Description:
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Product Description"
                  required
                  name="description"
                  value={product.description}
                  onChange={(e) => handleInputChange(e)}
                  className="textarea textarea-bordered text-accent-content bg-neutral-content tracking-widest"
                />
              </div>
            </div>
            <button className="btn btn-primary ml-2 mt-4 tracking-wider uppercase">
              Submit
            </button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default AddProducts;
