import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { SkeletonList } from '../components/Skeleton'

function AdminStudyContent() {
  const [formData, setFormData] = useState({
    subject: '',
    unit: '',
    mindMap: '',
    references: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [studyContent, setStudyContent] = useState([])
  const [contentLoading, setContentLoading] = useState(true)

  const fetchStudyContent = async () => {
    setContentLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await api.get('/api/study-content', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStudyContent(response.data.studyContent || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch study content')
    } finally {
      setContentLoading(false)
    }
  }

  useEffect(() => {
    fetchStudyContent()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      let parsedMindMap
      try {
        parsedMindMap = JSON.parse(formData.mindMap)
      } catch (parseError) {
        setError('Invalid JSON format for Mind Map')
        setLoading(false)
        return
      }

      const referencesArray = formData.references
        ? formData.references.split(',').map((ref) => ref.trim()).filter((ref) => ref)
        : []

      const token = localStorage.getItem('token')
      await api.post(
        '/api/study-content',
        {
          subject: formData.subject,
          unit: formData.unit,
          mindMap: parsedMindMap,
          references: referencesArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setSuccess('Study content created successfully')
      setFormData({
        subject: '',
        unit: '',
        mindMap: '',
        references: '',
      })
      fetchStudyContent()
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create study content'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Study Content</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded p-4 bg-white">
        <h2 className="text-lg font-medium">Create Study Content</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mind Map (JSON)</label>
          <textarea
            name="mindMap"
            value={formData.mindMap}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 font-mono text-sm"
            rows={6}
            placeholder='{"topic": "Processes", "subtopics": ["Process States", "PCB"]}'
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">References (comma-separated URLs)</label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="https://example.com, https://example2.com"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Study Content'}
        </button>
      </form>

      <div className="glass-card ui-card-body">
        <h2 className="text-lg font-medium mb-4 text-white">Study Content List</h2>
        {contentLoading ? (
          <SkeletonList />
        ) : studyContent.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-400">No study content yet.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {studyContent.map((content) => (
              <li
                key={content._id}
                className="flex justify-between items-center py-3 border-b border-white border-opacity-10 last:border-0"
              >
                <div>
                  <span className="font-medium text-white">{content.subject}</span>
                  <span className="text-sm text-gray-400 ml-2">- {content.unit}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminStudyContent
