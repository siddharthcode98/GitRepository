// Write your code here
const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li>
      <div>
        <img src={avatarUrl} alt={name} />
        <h1>{name}</h1>
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          {issuesCount}
        </p>
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          {forksCount}
        </p>
        <p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          {starsCount}
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
