import {Component} from 'react'

import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    isLoading: false,
    defaultFilter: languageFiltersData[0].id,
    popularRepos: [],
    apiStatus: apiStatusObj.initial,
  }

  componentDidMount() {
    this.renderRepos()
  }

  updatequeryParameter = id => {
    console.log(id)
    this.setState({defaultFilter: id, isLoading: false}, this.renderRepos)
  }

  renderRepos = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})

    const {defaultFilter} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${defaultFilter}`, // const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.popular_repos)
      const filteredData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        isLoading: true,
        popularRepos: filteredData,
        apiStatus: apiStatusObj.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {popularRepos} = this.state
    return (
      <ul>
        {popularRepos.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
    </div>
  )

  showDifferentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.inProgress:
        return this.renderLoading()
      case apiStatusObj.success:
        return this.renderSuccess()
      case apiStatusObj.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        <div>
          <LanguageFilterItem
            languageFiltersData={languageFiltersData}
            updatequeryParameter={this.updatequeryParameter}
          />
        </div>
        <div>{this.showDifferentViews()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
