// import Layout from "@/components/Layout";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function DeleteProductPage() {
//   const router = useRouter();
//   const [productInfo, setProductInfo] = useState();
//   const { id } = router.query;
//   useEffect(() => {
//     if (!id) {
//       return;
//     }
//     axios.get("/api/products?id=" + id).then((response) => {
//       setProductInfo(response.data);
//     });
//   }, [id]);
//   function goBack() {
//     router.push("/products");
//   }
//   async function deleteProduct() {
//     await axios.delete("/api/products?id=" + id);
//     goBack();
//   }

//   return (
//     <Layout>
//       <h1 className="text-center">
//         Do you really wnat to delete product &nbsp;"{productInfo?.title}"?
//       </h1>
//       <div className="flex gap-2 justify-center">
//         <button className="btn-red" onClick={deleteProduct}>
//           Yes
//         </button>
//         <button className="btn-default" onClick={goBack}>
//           No
//         </button>
//       </div>
//     </Layout>
//   );
// }


// import axios from "axios";
// import { useState } from "react";
// export default function DeleteProductPage() {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(false);
//   };

//   const handleDelete = async () => {
//     if (selectedProduct) {
//       await axios.delete("/api/products?id=" + selectedProduct._id);
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== selectedProduct._id)
//       );
//       closeModal();
//     }
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="modal-overlay fixed inset-0 bg-gray-800 opacity-50"></div>
//       <div className="modal-container bg-white w-96 mx-auto p-4 rounded shadow-lg transform scale-100 opacity-100 transition-transform transition-opacity duration-300 delay-200">
//         <div className="modal-content text-center">
//           <p className="text-lg mb-4">
//             Do you really want to delete product "{selectedProduct?.title}"?
//           </p>
//           <div className="flex justify-center">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//               onClick={handleDelete}
//             >
//               Yes
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={closeModal}
//             >
//               No
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
