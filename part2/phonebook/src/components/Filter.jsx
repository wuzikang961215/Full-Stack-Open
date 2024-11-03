const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
      <div>
        filter shown with: <input
          id="filter"
          value={searchTerm}
          onChange={handleSearchChange}
          autoComplete="filter"
        />
      </div>
    )
  }
  
  export default Filter
  