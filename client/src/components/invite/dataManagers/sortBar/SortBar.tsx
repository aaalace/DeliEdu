import { DateOrderEnum } from "../../../../enums/dateOrderEnum.ts";
import { ChangeEvent } from "react";

interface SortBarProps {
  order: DateOrderEnum,
  setOrder: (order: DateOrderEnum) => void
}

const SortBar = (props: SortBarProps) => {

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setOrder(event.target.value as DateOrderEnum);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value={DateOrderEnum.NewFirst}
            checked={props.order == DateOrderEnum.NewFirst}
            onChange={handleOptionChange}
          />
          NewFirst
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value={DateOrderEnum.OldFirst}
            checked={props.order == DateOrderEnum.OldFirst}
            onChange={handleOptionChange}
          />
          OldFirst
        </label>
      </div>
    </div>
  )
}

export default SortBar;