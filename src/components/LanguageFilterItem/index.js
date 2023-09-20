// Write your code here
const LanguageFilterItem = props => {
  const {languageFiltersData, updatequeryParameter} = props
  const sendlanguage = event => {
    updatequeryParameter(event.target.value)
  }
  return (
    <ul>
      {languageFiltersData.map(eachLanguage => (
        <li key={eachLanguage.id}>
          <button type="button" onClick={sendlanguage} value={eachLanguage.id}>
            {eachLanguage.language}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default LanguageFilterItem
