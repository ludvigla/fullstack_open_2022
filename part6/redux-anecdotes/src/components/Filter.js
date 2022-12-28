import { useSelector, useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(createFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input 
        onChange={handleFilterChange}
        value={filter}
      />
    </div>
  )
}

export default Filter