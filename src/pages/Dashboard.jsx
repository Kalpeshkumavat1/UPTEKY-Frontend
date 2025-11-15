import { useState, useEffect } from 'react'
import { getAllFeedback, getStats } from '../api/feedbackApi'
import AnalyticsCards from '../components/AnalyticsCards'
import FeedbackTable from '../components/FeedbackTable'
import '../styles/dashboard.css'

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [feedbacksData, statsData] = await Promise.all([
        getAllFeedback(),
        getStats()
      ])
      setFeedbacks(feedbacksData)
      setStats(statsData)
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p className="error-message">⚠️ {error}</p>
          <button onClick={fetchData} className="retry-btn">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Feedback Management Dashboard</h1>
        <a href="/" className="form-link">Submit Feedback →</a>
      </header>

      <AnalyticsCards stats={stats} />

      <section className="feedbacks-section">
        <h2>All Feedbacks</h2>
        <FeedbackTable feedbacks={feedbacks} onRefresh={fetchData} />
      </section>
    </div>
  )
}

export default Dashboard

