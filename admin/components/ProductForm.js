// import { useRouter } from "next/router";
// import axios from "axios";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../config/firebase-config";
// import { storage } from "../config/firebase-config";

// export default function ProductForm({
//   _id,
//   title: existingTitle,
//   description: existingDescription,
//   price: existingPrice,
//   productImages: propProductImages,
// }) {
//   const [title, setTitle] = useState(existingTitle || "");
//   const [description, setDescription] = useState(existingDescription || "");
//   const [price, setPrice] = useState(existingPrice || "");
//   const [goTOProducts, setGoToProducts] = useState(false);
//   const router = useRouter();

//   const [productImages, setProductImages] = useState();
//   // const storage = getStorage();
//   // console.log(productImages);
//   const app = initializeApp(firebaseConfig);
//   const storage = getStorage(app);
//   // Trigger the uploadFiles function when productImages state is updated
//   useEffect(() => {
//     uploadFiles();
//   }, [productImages]);
//   const links = [];
//   const uploadFiles = async () => {
//     // Check if productImages is defined and has length property
//     if (!productImages || productImages.length === 0) {
//       return;
//     }

//     for (let i = 0; i < productImages.length; i++) {
//       // Check if `storage` is properly initialized
//       if (!storage) {
//         console.error("Firebase Storage is not initialized.");
//         return;
//       }

//       const productImagesRef = ref(
//         storage,
//         `/multipleFiles/${productImages[i].name}`
//       );

//       try {
//         const result = await uploadBytes(productImagesRef, productImages[i]);
//         console.log("success", result);
//         const downloadURL = await getDownloadURL(productImagesRef);
//         links.push(downloadURL);
//         console.log("Download URL:", downloadURL);
//       } catch (error) {
//         console.error("error", error);
//       }
//     }
//   };

//   const handleFileChange = (ev) => {
//     setProductImages([...ev.target.files]);
//   };

//   async function saveProduct(ev) {
//     ev.preventDefault();
//     const data = { title, description, price };
//     try {
//       if (_id) {
//         // update
//         await axios.put("/api/products", { ...data, _id });
//       } else {
//         // create
//         await axios.post("/api/products", data);
//       }

//       setGoToProducts(true);
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }
//   }
//   if (goTOProducts) {
//     router.push("/products");
//   }

//   // async function uploadImages(ev) {
//   //   const files = ev.target?.files;
//   //   if (files?.length > 0) {
//   //     const data = new FormData();
//   //     for (const file of files) {
//   //       data.append("file", file);
//   //     }
//   //     const res = await fetch("/api/upload", {
//   //       method: "POST",
//   //       body: data,
//   //     });
//   //     console.log(res);
//   //   }
//   // }

//   return (
//     <form onSubmit={saveProduct}>
//       <label>Product Name</label>
//       <input
//         type="text"
//         placeholder="Product name"
//         value={title}
//         onChange={(ev) => setTitle(ev.target.value)}
//       />
//       {/* <label>Photos</label>
//       <div className="mb-2">
//         <label className="w-24 h-24 text-center flex text-sm gap-1 text-gray-500 items-center justify-center rounded-md bg-gray-200 cursor-pointer">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
//             />
//           </svg>
//           <div>Upload</div>
//           <input type="file" onChange={uploadImages} className="hidden" />
//         </label>
//         {!images?.length && <div>No Photos in this product</div>}
//       </div> */}
//       <label>Photos</label>
//       <div className="mb-2">
//         <label className="w-24 h-24 text-center flex text-sm gap-1 text-gray-500 items-center justify-center rounded-md bg-gray-200 cursor-pointer">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
//             />
//           </svg>
//           <div>Upload</div>
//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>
//         {!productImages?.length && <div>No Photos in this product</div>}
//       </div>
//       <label>Description</label>
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(ev) => setDescription(ev.target.value)}
//       ></textarea>
//       <label>Price USD</label>

//       <input
//         type="text"
//         placeholder="$ Price"
//         value={price}
//         onChange={(ev) => setPrice(ev.target.value)}
//       />
//       <button type="submit" className="btn-primary">
//         Save
//       </button>
//     </form>
//   );
// }
import { useRouter } from "next/router";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase-config";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  productImages: propProductImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [productImages, setProductImages] = useState();
  const router = useRouter();

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  useEffect(() => {
    uploadFiles();
  }, [productImages]);

  const uploadFiles = async () => {
    if (!productImages || productImages.length === 0 || !storage) {
      console.error("Firebase Storage is not initialized.");
      return;
    }

    const links = await Promise.all(
      productImages.map(async (image) => {
        if (!storage) {
          console.error("Firebase Storage is not initialized.");
          return null;
        }

        const productImagesRef = ref(storage, `/multipleFiles/${image.name}`);

        try {
          const result = await uploadBytes(productImagesRef, image);
          const downloadURL = await getDownloadURL(productImagesRef);
          console.log("Link:", downloadURL);
          return downloadURL;
        } catch (error) {
          console.error("Error uploading file:", error);
          return null;
        }
      })
      );
  };

  const handleFileChange = (ev) => {
    setProductImages([...ev.target.files]);
  };

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };

    try {
      const response = _id
        ? await axios.put("/api/products", { ...data, _id })
        : await axios.post("/api/products", data);

      console.log("Response:", response.data);

      setGoToProducts(true);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (goToProducts) {
    router.push("/products");
  }

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
      <div className="mb-2">
        <label className="w-24 h-24 text-center flex text-sm gap-1 text-gray-500 items-center justify-center rounded-md bg-gray-200 cursor-pointer">
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
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {!productImages?.length && <div>No Photos in this product</div>}
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