import CityAutocomplete from "../../../cityAutocomplete/CityAutocomplete.tsx";
import DateTimeAutoComplete from "../../../datetimeAutocomplete/DateTimeAutoComplete.tsx";
import "./index.scss"

interface FilterBarProps {
  selectedCity: string,
  date: string,
  setSelectedCity: (city: string) => void,
  setDate: (date: string) => void,
}

const FilterBar = (props: FilterBarProps) => {

  return (
    <div className="filter-bar-container">
      <CityAutocomplete
        setSelectedCity={props.setSelectedCity}
      />
      <DateTimeAutoComplete
        setSelectedDateTime={props.setDate}
      />
    </div>
  )
}

export default FilterBar;