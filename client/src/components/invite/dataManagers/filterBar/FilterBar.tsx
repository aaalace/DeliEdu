import CityAutocomplete from "../../../cityAutocomplete/CityAutocomplete.tsx";

interface FilterBarProps {
  selectedCity: string,
  date: string,
  setSelectedCity: (city: string) => void,
  setDate: (date: string) => void,
}

const FilterBar = (props: FilterBarProps) => {

  return (
    <div>
      <CityAutocomplete
        setSelectedCity={props.setSelectedCity}
      />
      <input
        type="date"
        onChange={(e) => props.setDate(e.target.value)}
        value={props.date}
      />
    </div>
  )
}

export default FilterBar;