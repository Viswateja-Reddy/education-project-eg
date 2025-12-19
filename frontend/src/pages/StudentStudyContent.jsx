import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { SkeletonCard } from '../components/Skeleton'

function StudentStudyContent() {
  const [studyContent, setStudyContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudyContent = async () => {
      setLoading(true)
      setError('')
      try {
        const token = localStorage.getItem('token')
        const response = await api.get('/api/study-content/student', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStudyContent(response.data.studyContent || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch study content')
      } finally {
        setLoading(false)
      }
    }

    fetchStudyContent()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Study Content</h1>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : studyContent.length === 0 ? (
        <div className="glass-card ui-card-body text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Study Content</h3>
          <p className="text-gray-400">No study content available at this time.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {studyContent.map((content) => (
            <div key={content._id} className="glass-card ui-card-body">
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-white">{content.subject}</h2>
                <p className="text-sm text-gray-400">Unit: {content.unit}</p>
              </div>

              {content.mindMap && (
                <div className="mt-4">
                  {content.mindMap.topic && (
                    <h3 className="font-medium text-base mb-2 text-white">
                      {content.mindMap.topic}
                    </h3>
                  )}
                  {content.mindMap.subtopics && Array.isArray(content.mindMap.subtopics) && (
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {content.mindMap.subtopics.map((subtopic, index) => (
                        <li key={index} className="text-sm text-gray-300">
                          {subtopic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {content.references && content.references.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2 text-white">References:</p>
                  <ul className="space-y-1">
                    {content.references.map((ref, index) => (
                      <li key={index}>
                        <a
                          href={ref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentStudyContent
