interface FilterBarProps {
  city: string,
  date: string,
  setCity: (city: string) => void,
  setDate: (date: string) => void,
}

const FilterBar = (props: FilterBarProps) => {

  return (
    <div>
      <input
        type="text"
        onChange={(e) => props.setCity(e.target.value)}
        value={props.city}
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