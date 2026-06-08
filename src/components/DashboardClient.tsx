'use client'

import { useState } from 'react'
import CaseSubmitForm from './CaseSubmitForm'

interface Case {
  id: string
  patient_name: string
  case_type: string
  material: string
  tooth_numbers: string[]
  shade: string
  status: string
  due_date: string
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  received: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  shipped: 'bg-purple-100 text-purple-700',
}

export default function DashboardClient({ userId, doctorName, practiceName, initialCases }: { userId: string, doctorName: string, practiceName?: string, initialCases: Case[] }) {
  const [view, setView] = useState<'cases' | 'new'>('cases')
  const [cases, setCases] = useState<Case[]>(initialCases)

  const handleSuccess = () => {
    setView('cases')
    window.location.reload()
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('cases')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'cases' ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Cases ({cases.length})
        </button>
        <button
          onClick={() => setView('new')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'new' ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          + New Case
        </button>
      </div>

      {view === 'new' ? (
       <CaseSubmitForm userId={userId} doctorName={doctorName} practiceName={practiceName} onSuccess={handleSuccess} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100">
          {cases.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-400">No cases submitted yet.</p>
              <button
                onClick={() => setView('new')}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                Submit your first case →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {cases.map(c => (
                <div key={c.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.patient_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {c.case_type} · {c.material} · #{c.tooth_numbers?.join(', ')}
                      {c.shade && ` · ${c.shade}`}
                    </p>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {new Date(c.created_at).toLocaleDateString()}
                      {c.due_date && ` · Due: ${new Date(c.due_date).toLocaleDateString()}`}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[c.status] || 'bg-gray-100 text-gray-600'}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}