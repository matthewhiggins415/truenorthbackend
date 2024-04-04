// const express = require('express');
// const Service = require('../models/serviceModel');
// const passport = require('passport');
// const requireToken = passport.authenticate('bearer', { session: false });
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// // const fs = require('fs').promises;

// const router = express.Router();

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // Multer upload configuration
// const upload = multer({ storage: storage });

// // Upload route
// router.post('/upload-image', async (req, res) => {
//   console.log(req.file)
//   console.log(req.formData)
//   try {
//     upload.single('image')(req, res, (err) => {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading
//         console.log(err)
//         return res.status(400).send('Multer error: ' + err.message);
//       } else if (err) {
//         // An unknown error occurred
//         console.log(err)
//         return res.status(500).send('Unknown error occurred');
//       }
      
//       // No error occurred, proceed with the route handler logic
//       if (!req.file) {
//         return res.status(400).send('No files were uploaded.');
//       }
//       // Do something with the uploaded file, e.g., save its path to a database
//       res.status(200).json({ msg: req.file.filename });
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Server error');
//   }
// });
  

// // get all images 
// router.get('/get-images', async (req, res, next) => {
//   try {
//     const imagesPath = path.join(__dirname, '../uploads'); // Path to the images directory
//     const files = await fs.promises.readdir(imagesPath);

//     // Filter out only image files (assuming only images are stored in the directory)
//     const images = files.filter(file => {
//       const ext = path.extname(file).toLowerCase();
//       return ['.png', '.jpg', '.jpeg', '.gif', '.bmp'].includes(ext);
//     });

//     res.json(images); // Send the list of image filenames to the frontend
//   } catch (error) {
//     console.error('Error getting images:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to remove an image
// router.delete('/remove-image/:filename', async (req, res) => {
//   try {
//     const filename = req.params.filename;
    
//     // Construct absolute path to the images folder
//     const imagesFolderPath = path.resolve(__dirname, '..', 'uploads');

//     // Construct path to the image file
//     const imagePath = path.join(imagesFolderPath, filename);

//     // Check if the file exists
//     fs.access(imagePath, async (error) => {
//       if (error) {
//         console.log(error);
//         return res.status(404).json({ error: 'Image not found' });
//       }

//       // Delete the file
//       try {
//         await fs.promises.unlink(imagePath);

//         // Retrieve the remaining images after deletion
//         const files = await fs.promises.readdir(imagesFolderPath);
//         const remainingImages = files.filter(file => file !== filename);

//         res.json({ message: 'Image removed successfully', remainingImages });
//       } catch (err) {
//         console.error('Error deleting image:', err);
//         res.status(500).json({ error: 'Failed to delete image' });
//       }
//     });
//   } catch (error) {
//     console.error('Error removing image:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// module.exports = router;