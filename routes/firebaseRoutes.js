const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } = require('firebase/storage');
const multer = require('multer');
const passport = require('passport');
const requireToken = passport.authenticate('bearer', { session: false });
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const upload = multer();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

router.post('/upload-many', upload.array('images', 10), async (req, res, next) => {  
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  
  const uuid = uuidv4();
  const name = `${uuid}.jpg`
  const storageRef = ref(storage, `/${name}`);
  const file = req.files[0]
  
  try {
    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file.buffer);
  
    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    const image = {
      downloadURL: downloadURL,
      imgName: name
    }

    res.status(201).json({ image });
  } catch (error) {
    throw new Error('Error uploading images to Firebase Storage.');
  }
});

// router.get('/retrieve-all-images', async (req, res) => {
//   try {
//     // Reference to the root directory of the storage bucket
//     const storageRef = ref(storage);
  
//     // List all the items (images) in the storage bucket
//     const { items } = await listAll(storageRef);

    
  
//     // Array to store download URLs of images
//     const imageUrls = [];
  
//       // Iterate over each image item and get its download URL
//     for (const item of items) {
//       console.log("item:", item)
//       const downloadURL = await getDownloadURL(item);
//       console.log("downloadURL:", downloadURL)
//       imageUrls.push(downloadURL);
//     }

//     console.log("image urls array:", imageUrls)
  
//     res.status(200).json({ imageUrls });
//   } catch (error) {
//     console.error('Error fetching images from Firebase Storage:', error);
//     res.status(500).json({ error: 'Error fetching images from Firebase Storage' });
//   }
// });

router.delete('/remove-image/:imageName', async (req, res, next) => {
  const imageName = req.params.imageName;

  console.log(req)

  console.log(imageName)

  try {
    // Reference to the image file in Firebase Storage
    const imageRef = ref(storage, imageName);
  
    // Delete the image file from Firebase Storage
    await deleteObject(imageRef);
  
    res.status(200).json({ message: 'Image removed successfully' });
  } catch (error) {
    console.error('Error removing image from Firebase Storage:', error);
    res.status(500).json({ error: 'Error removing image from Firebase Storage' });
  }
});

module.exports = router