const SearchField = (props) =>
  <>
    <form onSubmit={props.handleSubmit}>
      <div>
        find countries <input value={props.search} onChange={props.handleSearchChange}/>
      </div>
    </form>
  </>

export default SearchField;