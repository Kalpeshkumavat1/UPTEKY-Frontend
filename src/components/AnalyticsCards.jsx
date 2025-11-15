import '../styles/dashboard.css'

const AnalyticsCards = ({ stats }) => {
  if (!stats) {
    return <div className="loading">Loading analytics...</div>
  }

  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalFeedbacks || 0,
      icon: '📊',
      color: '#4A90E2'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating ? stats.averageRating.toFixed(1) : '0.0',
      icon: '⭐',
      color: '#F5A623'
    },
    {
      title: 'Positive (≥4)',
      value: stats.positiveFeedbacks || 0,
      icon: '👍',
      color: '#7ED321'
    },
    {
      title: 'Negative (≤2)',
      value: stats.negativeFeedbacks || 0,
      icon: '👎',
      color: '#D0021B'
    }
  ]

  return (
    <div className="analytics-cards">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="analytics-card"
          style={{ '--card-color': card.color }}
        >
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsCards

