import { useDispatch } from "react-redux"
import { filterValueChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilterValue = (event) => {
    console.log('event triggered with value', event.target.value)
    dispatch(filterValueChange(event.target.value))
  } 

  return (
    <div className="m-4 font-sans font-bold">
      Filter: <input 
        onChange={changeFilterValue} 
        name="filter" 
        className="rounded pl-2"
      />
    </div>
  )
}

export default Filter