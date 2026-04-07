import { useState, useEffect } from 'react'
import './App.css'

interface UploadedFile {
  id: number
  filename: string
  url: string
  size: number
  uploaded_at: string
}

function App() {
  const [count, setCount] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [activeTab, setActiveTab] = useState<'counter' | 'upload'>('counter')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(() => {
    if (activeTab === 'upload') {
      fetchFiles()
    }
  }, [activeTab])

  const resetCounter = () => {
    setCount(0)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage('❌ File too large (max 10MB)')
        return
      }
      if (!selectedFile.type.startsWith('image/')) {
        setMessage('❌ Only image files allowed')
        return
      }
      setFile(selectedFile)
      setMessage('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ Please select a file')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ Uploaded: ${file.name}`)
        setFile(null)
        const fileInput = document.getElementById('fileInput') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        setTimeout(() => fetchFiles(), 500)
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/files`)
      const data = await response.json()
      setFiles(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch files:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <>
      <div className="container">
<h1>Lab7 - Web App Dashboard</h1>
        <p className="subtitle">AWS EC2 + S3 + PostgreSQL Integration</p>

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'counter' ? 'active' : ''}`}
            onClick={() => setActiveTab('counter')}
          >
            Counter
          </button>
          <button
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Image Gallery
          </button>
        </div>

        {activeTab === 'counter' && (
          <div className="counter-section">
            <h2>Click Counter</h2>
            <div className="counter-display">
              <div className="count-number">{count}</div>
              <p className="count-label">Total Clicks</p>
            </div>

            <div className="button-group">
              <button 
                className="click-button" 
                onClick={() => setCount((count) => count + 1)}
              >
                Click Me!
              </button>
              <button 
                className="reset-button" 
                onClick={resetCounter}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-section">
            <h2>Upload Images to S3</h2>
            
            <div className="upload-area">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label htmlFor="fileInput" className="file-label">
                {file ? `${file.name}` : 'Select Image to Upload'}
              </label>
              <button
                className="upload-button"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload to S3'}
              </button>
            </div>

            {message && (
              <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <div className="gallery">
              <h3>Uploaded Files ({files.length})</h3>
              {files.length === 0 ? (
                <p className="empty">No files uploaded yet</p>
              ) : (
                <div className="file-grid">
                  {files.map((f) => (
                    <a
                      key={f.id}
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-item"
                    >
                      <img src={f.url} alt={f.filename} />
                      <div className="file-info">
                        <p className="filename">{f.filename}</p>
                        <p className="filesize">{formatFileSize(f.size)}</p>
                        <p className="date">
                          {new Date(f.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="info">
          <p>React + TypeScript + Vite</p>
          <p>Express.js Backend API</p>
          <p>AWS S3 Storage</p>
          <p>PostgreSQL Database</p>
        </div>
      </div>
    </>
  )
}

export default App
