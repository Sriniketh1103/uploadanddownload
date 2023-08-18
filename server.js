const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'uploads'), // Use absolute path
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Track uploaded file names in an array
let uploadedFiles = [];

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Add the uploaded file name to the array
  uploadedFiles.push(req.file.filename);

  // Redirect to the uploaded_files.html page after successful upload
  res.redirect('/uploadedFiles');
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', 'uploads', filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
    }
  });
});

// Serve the initial HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the uploaded_files.html
app.get('/uploadedFiles', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uploaded_files.html'));
});
  
// Route to fetch the list of uploaded files
app.get('/getUploadedFiles', (req, res) => {
  res.json({ filenames: uploadedFiles });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
