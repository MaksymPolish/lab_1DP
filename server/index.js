import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false
}));

app.use(express.json());

// Local storage for uploaded files
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// In-memory store for file metadata
let uploadedFiles = [];

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uploadedFiles: uploadedFiles.length,
    storageMode: 'local'
  });
});

// Image upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileRecord = {
      id: uploadedFiles.length + 1,
      filename: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      localPath: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploaded_at: new Date().toISOString()
    };

    uploadedFiles.push(fileRecord);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileRecord.id,
        filename: fileRecord.filename,
        url: fileRecord.url,
        size: fileRecord.size,
        uploaded_at: fileRecord.uploaded_at
      }
    });

    console.log(`✅ File uploaded: ${fileRecord.filename} (${fileRecord.size} bytes)`);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all uploaded files
app.get('/api/files', (req, res) => {
  const files = uploadedFiles.map(f => ({
    id: f.id,
    filename: f.filename,
    url: f.url,
    size: f.size,
    mimetype: f.mimetype,
    uploaded_at: f.uploaded_at
  })).reverse();
  
  res.json(files);
});

// Serve uploaded files as static
app.use('/uploads', express.static(uploadDir));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${uploadDir}`);
  console.log(`📊 Storage Mode: Local file storage (Demo)`);
  console.log(`✅ API ready at http://localhost:${PORT}/api`);
});
