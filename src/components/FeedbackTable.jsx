import { useState } from 'react'
import '../styles/table.css'

const FeedbackTable = ({ feedbacks, onRefresh }) => {
  const [ratingFilter, setRatingFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const filteredFeedbacks = feedbacks
    .filter(feedback => {
      if (ratingFilter === 'all') return true
      if (ratingFilter === 'positive') return feedback.rating >= 4
      if (ratingFilter === 'negative') return feedback.rating <= 2
      return feedback.rating === parseInt(ratingFilter)
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === 'rating-high') {
        return b.rating - a.rating
      } else {
        return a.rating - b.rating
      }
    })

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Rating', 'Message', 'Created At']
    const rows = filteredFeedbacks.map(f => [
      f.name,
      f.email || '',
      f.rating,
      `"${f.message.replace(/"/g, '""')}"`,
      formatDate(f.createdAt)
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feedbacks-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <p>No feedbacks available yet.</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <div className="table-controls">
        <div className="filter-group">
          <label htmlFor="rating-filter">Filter by Rating:</label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="positive">Positive (≥4)</option>
            <option value="negative">Negative (≤2)</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating-high">Rating (High to Low)</option>
            <option value="rating-low">Rating (Low to High)</option>
          </select>
        </div>

        <button onClick={exportToCSV} className="export-btn">
          📥 Export CSV
        </button>

        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="name-cell">{feedback.name}</td>
                <td className="email-cell">{feedback.email || '-'}</td>
                <td className="rating-cell">
                  <span className="rating-stars" title={`${feedback.rating} out of 5`}>
                    {getRatingStars(feedback.rating)}
                  </span>
                  <span className="rating-number">({feedback.rating})</span>
                </td>
                <td className="message-cell">{feedback.message}</td>
                <td className="date-cell">{formatDate(feedback.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>Showing {filteredFeedbacks.length} of {feedbacks.length} feedbacks</p>
      </div>
    </div>
  )
}

export default FeedbackTable

