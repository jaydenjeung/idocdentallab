'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

const CASE_TYPES = ['Crown', 'Bridge', 'Denture', 'Partial Denture', 'Implant Crown', 'Veneer', 'Night Guard', 'Other']
const MATERIALS = ['Full Contour Zirconia', 'PFM', 'E-max', 'Acrylic', 'Valplast', 'Metal', 'PMMA', 'Other']
const SHADES = ['A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D2', 'BL1', 'BL2', 'BL3', 'BL4']
const UPPER_TEETH = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
const LOWER_TEETH = [32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17]

export default function CaseSubmitForm({
  userId,
  doctorName,
  practiceName,
  onSuccess,
  notifySource = 'client-portal',
  requireFiles = false,
}: {
  userId: string
  doctorName: string
  practiceName?: string
  onSuccess: () => void
  notifySource?: 'client-portal' | 'digital-impression'
  requireFiles?: boolean
}) {
  const [step, setStep] = useState<'form' | 'sign'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    patient_name: '',
    patient_dob: '',
    case_type: '',
    material: '',
    shade: '',
    due_date: '',
    notes: '',
    tooth_numbers: [] as string[],
    file_paths: [] as string[],
    file_names: [] as string[],
  })

  const toggleTooth = (num: number) => {
    const str = num.toString()
    setForm(prev => ({
      ...prev,
      tooth_numbers: prev.tooth_numbers.includes(str)
        ? prev.tooth_numbers.filter(t => t !== str)
        : [...prev.tooth_numbers, str]
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')
    const supabase = createClient()
    const paths: string[] = []
    const names: string[] = []

    for (const file of Array.from(files)) {
      const path = `${userId}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('clinic-uploads')
        .upload(path, file)

      if (uploadError) {
        setError(uploadError.message)
        continue
      }
      paths.push(path)
      names.push(file.name)
    }

    setForm(prev => ({
      ...prev,
      file_paths: [...prev.file_paths, ...paths],
      file_names: [...prev.file_names, ...names],
    }))
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleContinueToSign = () => {
    if (!form.patient_name || !form.case_type || !form.material) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.tooth_numbers.length === 0) {
      setError('Please select at least one tooth number.')
      return
    }
    if (requireFiles && form.file_paths.length === 0) {
      setError('Please attach at least one scan file.')
      return
    }
    setError('')
    setStep('sign')
  }

  const handleSubmit = async () => {
    if (!agreed) {
      setError('Please authorize the prescription to continue.')
      return
    }

    setLoading(true)
    setError('')
    const supabase = createClient()

    const { error: insertError } = await supabase
      .from('clinic_cases')
      .insert({
        clinic_id: userId,
        patient_name: form.patient_name,
        patient_dob: form.patient_dob || null,
        case_type: form.case_type,
        material: form.material,
        shade: form.shade || null,
        due_date: form.due_date || null,
        notes: form.notes || null,
        tooth_numbers: form.tooth_numbers,
        file_paths: form.file_paths,
        status: 'received',
        signature_name: doctorName,
        signature_timestamp: new Date().toISOString(),
        signed: true,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    await fetch('/api/scan-upload-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: notifySource,
        practiceName,
        doctorName,
        patientName: form.patient_name,
        caseType: form.case_type,
        material: form.material,
        shade: form.shade,
        toothNumbers: form.tooth_numbers.join(', '),
        dueDate: form.due_date,
        notes: form.notes,
        fileNames: form.file_names,
      }),
    })

    onSuccess()
  }

  if (step === 'sign') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Review & Sign</h3>
          <p className="text-xs text-gray-400 mt-0.5">Please review the case details and authorize.</p>
        </div>

        {/* Case Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Patient</span>
            <span className="font-medium text-gray-900">{form.patient_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Case Type</span>
            <span className="font-medium text-gray-900">{form.case_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Material</span>
            <span className="font-medium text-gray-900">{form.material}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tooth #</span>
            <span className="font-medium text-gray-900">{form.tooth_numbers.join(', ')}</span>
          </div>
          {form.shade && (
            <div className="flex justify-between">
              <span className="text-gray-500">Shade</span>
              <span className="font-medium text-gray-900">{form.shade}</span>
            </div>
          )}
          {form.due_date && (
            <div className="flex justify-between">
              <span className="text-gray-500">Due Date</span>
              <span className="font-medium text-gray-900">{new Date(form.due_date).toLocaleDateString()}</span>
            </div>
          )}
          {form.file_names.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Files</span>
              <span className="font-medium text-gray-900">{form.file_names.length} file(s)</span>
            </div>
          )}
          {form.notes && (
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-500 text-xs">Notes: </span>
              <span className="text-gray-700 text-xs">{form.notes}</span>
            </div>
          )}
        </div>

        {/* Signature */}
        <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
              I, <span className="font-semibold">Dr. {doctorName}</span>, hereby authorize this dental laboratory prescription and certify that this case meets all applicable requirements. I understand this constitutes a legally binding electronic signature under the E-SIGN Act.
            </label>
          </div>
          {agreed && (
            <div className="mt-3 pt-3 border-t border-blue-100 text-xs text-gray-400">
              Signed by: <span className="text-gray-600 font-medium">Dr. {doctorName}</span> · {new Date().toLocaleString()}
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setStep('form')}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !agreed}
            className="flex-2 flex-grow bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Case'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Submit New Case</h3>
        <p className="text-xs text-gray-400 mt-0.5">Fill in the case details and upload scan files.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Patient Name *</label>
          <input
            value={form.patient_name}
            onChange={e => setForm({ ...form, patient_name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last, First"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={form.patient_dob}
            onChange={e => setForm({ ...form, patient_dob: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Case Type *</label>
          <select
            value={form.case_type}
            onChange={e => setForm({ ...form, case_type: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {CASE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Material *</label>
          <select
            value={form.material}
            onChange={e => setForm({ ...form, material: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

       <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-700">Tooth Number(s) *</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, tooth_numbers: UPPER_TEETH.map(String) }))}
              className="text-xs text-blue-600 hover:underline"
            >
              Upper All
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, tooth_numbers: LOWER_TEETH.map(String) }))}
              className="text-xs text-blue-600 hover:underline"
            >
              Lower All
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, tooth_numbers: [] }))}
              className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2 px-1">
            <span>← Right</span>
            <span className="font-medium text-gray-500">Upper</span>
            <span>Left →</span>
          </div>
          <div className="flex gap-1 justify-center mb-1">
            {UPPER_TEETH.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => toggleTooth(n)}
                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                  form.tooth_numbers.includes(n.toString())
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex gap-1 justify-center mb-2">
            {LOWER_TEETH.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => toggleTooth(n)}
                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                  form.tooth_numbers.includes(n.toString())
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="text-center text-xs text-gray-400">Lower</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Shade</label>
          <div className="flex flex-wrap gap-1.5">
            {SHADES.map(s => (
              <button
                key={s}
                onClick={() => setForm({ ...form, shade: form.shade === s ? '' : s })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  form.shade === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={form.due_date}
            onChange={e => setForm({ ...form, due_date: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Scan Files</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors"
        >
          <p className="text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload STL · DCM · ZIP · PLY'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".stl,.dcm,.zip,.ply,.obj,.3ds"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        {form.file_names.length > 0 && (
          <div className="mt-2 space-y-1">
            {form.file_names.map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-green-500">✓</span> {name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Any special instructions for the lab..."
        />
      </div>

      <button
        onClick={handleContinueToSign}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Continue to Sign →
      </button>
    </div>
  )
}