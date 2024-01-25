import React, { useEffect, useState } from "react";
import Container from "../hoc/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Label from "../hoc/Label";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";

const schema = yup.object({
  productName: yup.string().required("Product name is required!"),
  price: yup.number().required("Product price is required!"),
  quantity: yup.number().required("Product quantity is required!"),
  brand: yup.string().required("Product brand is required!"),
  description: yup.string().required("Product description is required!"),
});

const categories = [
  { id: nanoid(), name: "Laptop" },
  { id: nanoid(), name: "Electronics" },
  { id: nanoid(), name: "Fashion" },
  { id: nanoid(), name: "Phone" },
];

const EditProduct = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLink, setImageLink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productEdit, setProductEdit] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  const products = useSelector(selectProducts);
  // console.log(products);

  const singleProduct = products.find((product) => product.id === id);
  sessionStorage.setItem("singleProduct", JSON.stringify(singleProduct));
  let storedProduct = sessionStorage.getItem("singleProduct");
  storedProduct = JSON.parse(storedProduct);
  setProductEdit(storedProduct);

  console.log(productEdit);

  const {
    productName,
    brand,
    category,
    description,
    // imageLink,
    price,
    quantity,
  } = productEdit;

  const form = useForm({
    defaultValues: {
      productName: productName,
      price: price,
      quantity: quantity,
      category: category,
      brand: brand,
      description: description,
      imageLink: imageLink,
    },
    resolver: yupResolver(schema),
  });

  const { register, setValue, control, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting } = formState;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
        setIsUploading(false);
      },
      () => {
        setIsUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageLink(downloadURL);
          setValue("imageLink", downloadURL);
          toast.success("Image uploaded successfully...");
        });
      }
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);

    try {
      const {
        productName,
        price,
        quantity,
        category,
        brand,
        imageLink,
        description,
      } = data;

      // console.log();

      toast.success("Product uploaded successfully.");
      reset();
      setIsLoading(false);
      setImageLink();
      setIsUploading(false);
      setUploadProgress(0);
      navigate("/admin/viewProducts");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Container>
        <div className="bg-base-100 w-full h-full rounded-md px-6 py-6 text-neutral overflow-auto">
          <h1 className="text-2xl font-semibold underline py-2 px-4 tracking-wider text-secondary">
            Edit Product Page
          </h1>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
              {/* PRODUCT NAME */}
              <div className="flex flex-col justify-center gap-2 py-2 px-2">
                <Label className="tracking-wider">Product Name:</Label>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered text-accent-content bg-neutral-content tracking-widest"
                    {...register("productName")}
                  />
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.productName?.message}
                  </p>
                </div>
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2 w-full">
                <Label className="tracking-wider">Product Price:</Label>
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="input text-accent-content bg-neutral-content tracking-widest"
                    {...register("price")}
                  />
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.price?.message}
                  </p>
                </div>
              </div>

              {/* PRODUCT QUANTITY */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2 w-full">
                <Label className="tracking-wider">Product Quantity:</Label>
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    placeholder="Product Quantity"
                    className="input text-accent-content bg-neutral-content tracking-widest"
                    {...register("quantity")}
                  />
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.quantity?.message}
                  </p>
                </div>
              </div>

              {/* PRODUCT CATEGORY */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2 w-full">
                <Label className="tracking-wider">Product Category:</Label>
                <div className="flex flex-col gap-1">
                  <select
                    className="select w-full bg-neutral-content text-accent-content tracking-widest"
                    {...register("category")}
                  >
                    <option value="" disabled>
                      -- Choose Product Category
                    </option>
                    {categories.map((category) => {
                      return (
                        <option
                          value={category.name}
                          key={category.id}
                          className="text-neutral"
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-sm text-red-600 tracking-wider ">
                    {errors.category?.message}
                  </p>
                </div>
              </div>

              {/* PRODUCT Brand */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2">
                <Label className="tracking-wider">Product Brand/Company:</Label>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Product Brand/Company"
                    className="input text-accent-content bg-neutral-content tracking-widest"
                    {...register("brand")}
                  />
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.brand?.message}
                  </p>
                </div>
              </div>

              {/* PRODUCT IMAGE */}
              <div className="flex flex-col justify-center gap-1 px-2 border rounded-md py-2">
                <Label className="tracking-wider">Product Image:</Label>

                {/* Render the progress bar only when uploading */}
                {!isUploading && uploadProgress > 0 && (
                  <div className="flex items-center justify-center py-1">
                    <Box sx={{ width: `${uploadProgress}%` }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                    </Box>
                    <p className="text-sm text-neutral tracking-wider">
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}%`
                        : `Uploaded ${uploadProgress}%`}
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  placeholder="Product Image"
                  className="border p-2 rounded-md text-accent-content tracking-widest"
                  {...register("imageUrl")}
                  onChange={(e) => handleImageChange(e)}
                />
                {errors && (
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.imageUrl?.message}
                  </p>
                )}
                {imageLink && (
                  <input
                    type="text"
                    value={imageLink}
                    className="p-2 rounded-md input"
                    disabled
                  />
                )}
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="flex flex-col justify-center gap-4 py-2 px-2">
                <Label className="tracking-wider">Product Description:</Label>
                <div className="flex flex-col gap-1">
                  <textarea
                    placeholder="Product Description"
                    rows="7"
                    className="textarea textarea-bordered text-accent-content bg-neutral-content tracking-widest"
                    {...register("description")}
                  ></textarea>
                  <p className="text-sm text-red-600 tracking-wider">
                    {errors.description?.message}
                  </p>
                </div>
              </div>
            </div>
            <button className="btn btn-neutral w-[20%] mt-2 ml-2 text-xl uppercase tracking-wider">
              Update
            </button>
          </form>
        </div>
      </Container>
      <DevTool control={control} />
    </>
  );
};

export default EditProduct;
