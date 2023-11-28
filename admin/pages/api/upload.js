// import multiparty from "multiparty";
// import { resolve } from "styled-jsx/css";

// export default async function handle(req, res) {
//   const form = new multiparty.Form();
//   const { fields, files } = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
//   console.log("length:", files.file.length);
//   return res.json("ok");
// }

// export const config = {
//   api: { bodyParser: false },
// };



// import multiparty from "multiparty";
// import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../config/firebase-config";

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export default async function handle(req, res) {
//   const form = new multiparty.Form();
//   const { fields, files } = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });

//   console.log("length:", files.file.length);
//   const links = [];

//   for (const file of files.file) {
//     const productImagesRef = ref(
//       storage,
//       `/multipleFiles/${file.originalFilename}`
//     );

//     try {
//       const result = await uploadBytes(productImagesRef, file.path);
//       const downloadURL = await getDownloadURL(productImagesRef);
//       links.push(downloadURL);
//       console.log("Download URL:", downloadURL);
//     } catch (error) {
//       console.error("error", error);
//     }
//   }

//   return res.json({ links });
// }

// export const config = {
//   api: { bodyParser: false },
// };




// import multiparty from "multiparty";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../config/firebase-config";

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export default async function handle(req, res) {
//   const form = new multiparty.Form();
//   const { files } = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ files });
//     });
//   });

//   const links = [];

//   for (const file of files.file) {
//     const productImagesRef = ref(storage, `/multipleFiles/${file.originalFilename}`);

//     try {
//       const downloadURL = await uploadAndReturnURL(productImagesRef, file.path);
//       links.push(downloadURL);
//       console.log("Download URL:", downloadURL);
//     } catch (error) {
//       console.error("error", error);
//     }
//   }

//   return res.json({ links });
// }

// export const config = {
//   api: { bodyParser: false },
// };

// async function uploadAndReturnURL(ref, path) {
//   const result = await uploadBytes(ref, path);
//   return getDownloadURL(ref);
// }


import multiparty from "multiparty";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase-config";

let storage;

const initializeStorage = () => {
  if (!storage) {
    const app = initializeApp(firebaseConfig);
    storage = getStorage(app);
  }
};

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files });
    });
  });

  const links = [];

  for (const file of files.file) {
    initializeStorage();

    const productImagesRef = ref(storage, `/multipleFiles/${file.originalFilename}`);

    try {
      const downloadURL = await uploadAndReturnURL(productImagesRef, file.path);
      links.push(downloadURL);
      console.log("Download URL:", downloadURL);
    } catch (error) {
      console.error("error", error);
    }
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};

async function uploadAndReturnURL(ref, path) {
  const result = await uploadBytes(ref, path);
  return getDownloadURL(ref);
}
