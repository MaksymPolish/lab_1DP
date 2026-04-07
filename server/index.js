import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// AWS S3 Configuration
const s3Client = new S3Client({ 
  region: process.env.AWS_REGION || 'eu-central-1'
});

const BUCKET_NAME = process.env.AWS_BUCKET || 'lab7-polishchuk-2024-files';

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false
}));

app.use(express.json());

// Multer configuration for in-memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// In-memory store for file metadata
let uploadedFiles = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uploadedFiles: uploadedFiles.length,
    storageMode: 'AWS S3'
  });
});

// Image upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const s3Key = `uploads/${fileName}`;

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    });

    await s3Client.send(uploadCommand);

    // Generate signed URL for access (valid for 7 days)
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 7 * 24 * 60 * 60 });

    const fileRecord = {
      id: uploadedFiles.length + 1,
      filename: req.file.originalname,
      s3Key: s3Key,
      url: signedUrl,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploaded_at: new Date().toISOString()
    };

    uploadedFiles.push(fileRecord);

    res.json({
      success: true,
      message: 'File uploaded to S3 successfully',
      file: {
        id: fileRecord.id,
        filename: fileRecord.filename,
        url: fileRecord.url,
        size: fileRecord.size,
        uploaded_at: fileRecord.uploaded_at
      }
    });

    console.log(`File uploaded to S3: ${fileRecord.filename} (${fileRecord.size} bytes)`);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all uploaded files
app.get('/api/files', async (req, res) => {
  try {
    // Return cached file list with signed URLs
    const files = uploadedFiles.map(f => ({
      id: f.id,
      filename: f.filename,
      url: f.url,
      size: f.size,
      mimetype: f.mimetype,
      uploaded_at: f.uploaded_at
    })).reverse();
    
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`S3 Bucket: ${BUCKET_NAME}`);
  console.log(`Storage Mode: AWS S3`);
  console.log(`API ready at http://localhost:${PORT}/api`);
});
