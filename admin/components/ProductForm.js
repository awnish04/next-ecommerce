import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  img: existingImg,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [img, setImg] = useState(existingImg || []);
  const [isUploading,setIsUploading] = useState(false);

  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      img,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imagebase64(file);
    setImg(image);
    setIsUploading(true); 
    // Call handleSubmit directly after setting the image
    await handleSubmit();
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("img", img);

    try {
      let response;
      if (_id) {
        // Update
       response = await axios.put(`/api/products?id=${_id}`, data);
      } else {
        // Create
       response = await axios.post("/api/products", data);
      }
      // Log the server response
    console.log("Server Response:", response.data);
      // Optionally, you can redirect to another page or perform any other actions here
      // setGoToProducts(true);
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
      // setErrorMessage("Error uploading product. Please try again.");
    }
  };

  
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {/* {!!images?.length && images.map((dataVal, index) => (
          <div key={index} className="h-24" >
            <img
              className="object-cover rounded-md"
              src={dataVal.url}
              alt={`Image ${index}`}
            />
          </div>
        ))} */}

        
          {img && 
          <div  className="h-24" >
          <img
            className="object-cover rounded-md"
            src={img}
          />
        </div>
          }

          {isUploading && (
            <div className= "h-24  flex items-center">
              <Spinner/>
            </div>
          )}


        <label className="w-24 h-24 text-center flex font-semibold text-sm gap-1 text-gray-500 items-center justify-center rounded-md bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input
            type="file"
            multiple
            onChange={handleUploadImage}
            // onChange={(e) => handleFileSelection(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price USD</label>
      <input
        type="text"
        placeholder="$ Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
