import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { imageDb } from "../lib/firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { SHA256 } from 'crypto-js';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,

}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState([]);
  const [firebaseImages, setFirebaseImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
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

  // ...

  useEffect(() => {
    listAll(ref(imageDb, "productimages"))
      .then((imgs) => {
        // Using Promise.all to wait for all getDownloadURL promises to resolve
        return Promise.all(imgs.items.map((item) => getDownloadURL(item)));
      })
      .then((urls) => {
        // urls is an array of download URLs from Firebase Storage
        setFirebaseImages(urls);
      })
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleFileSelection = async (files) => {
    if (files.length > 0) {
      // Assuming you want to upload all selected files
      const uploadPromises = Array.from(files).map(async (file) => {
        // Create a hash of the file content (you can use a library like crypto-js for this)
        const fileContent = await file.arrayBuffer();
        // Calculate SHA-256 hash of the file content
      const fileHash = SHA256(fileContent).toString();


        // Check if the image with the same hash already exists
        const existingImage = images.find((url) => url.hash === fileHash);

        if (existingImage) {
          // Image already exists, no need to upload again
          return existingImage;
        }

        // Create a reference using the ref function
        const imgRef = ref(imageDb, `productimages/${v4()}`);

        // Upload the bytes
        const uploadTask = uploadBytes(imgRef, file);

        // Return a promise that resolves with the download URL and hash
        return uploadTask.then(async (snapshot) => {
          const url = await getDownloadURL(imgRef);
          return { url, hash: fileHash };
        });
      });

      // Wait for all upload promises to resolve
      Promise.all(uploadPromises)
        .then((urls) => {
          // urls is an array of download URLs and hashes uploaded in the current session
          setImages((data) => [...data, ...urls]);
          setSuccessMessage("Images uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error during file upload:", error);
          setErrorMessage("Error uploading images. Please try again.");
        });
    }
  };
  console.log(images);

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
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length && images.map((dataVal, index) => (
          <div key={index} className="h-24" >
            <img
              className="object-cover rounded-md"
              src={dataVal.url}
              alt={`Image ${index}`}
            />
          </div>
        ))}
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
            onChange={(e) => handleFileSelection(e.target.files)}
            className="hidden"
          />
        </label>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* {imgUrl?.length && <div>No Photos in this product</div>} */}
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
