'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

interface UploadedFile {
  name: string
  size: number
  path: string
  uploadedAt: string
}

export default function FileUpload({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED = ['.stl', '.dcm', '.zip', '.ply', '.obj', '.3ds']

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected || selected.length === 0) return

    setUploading(true)
    setError('')
    setSuccess('')

    const supabase = createClient()
    const uploaded: UploadedFile[] = []

    for (const file of Array.from(selected)) {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()
      if (!ACCEPTED.includes(ext)) {
        setError(`${file.name} — unsupported file type.`)
        continue
      }

      const path = `${userId}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('clinic-uploads')
        .upload(path, file)

      if (uploadError) {
        setError(uploadError.message)
        continue
      }

      uploaded.push({
        name: file.name,
        size: file.size,
        path,
        uploadedAt: new Date().toLocaleString(),
      })
    }

    if (uploaded.length > 0) {
      setFiles(prev => [...uploaded, ...prev])
      setSuccess(`${uploaded.length} file(s) uploaded successfully.`)
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Upload Scan Files</h3>
      <p className="text-xs text-gray-400 mb-4">Accepted: STL · DCM · ZIP · PLY · OBJ · 3DS</p>

      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
      >
        <div className="text-3xl mb-2">📁</div>
        <p className="text-sm text-gray-500">
          {uploading ? 'Uploading...' : 'Click to select files'}
        </p>
        <p className="text-xs text-gray-300 mt-1">or drag and drop</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".stl,.dcm,.zip,.ply,.obj,.3ds"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg text-xs text-green-600">
          ✓ {success}
        </div>
      )}

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-gray-500">Uploaded this session</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">📄</span>
                <div>
                  <p className="text-xs font-medium text-gray-700">{f.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(f.size)} · {f.uploadedAt}</p>
                </div>
              </div>
              <span className="text-xs text-green-500 font-medium">✓</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}