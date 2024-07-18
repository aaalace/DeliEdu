import { DateOrderEnum } from "../../../../enums/dateOrderEnum.ts";
import { ChangeEvent } from "react";
import './index.scss';

interface SortBarProps {
  order: DateOrderEnum,
  setOrder: (order: DateOrderEnum) => void
}

const SortBar = (props: SortBarProps) => {

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setOrder(event.target.value as DateOrderEnum);
  };

  return (
    <div className="sort-bar">
      <div className="sort-option">
        <label className="sort-label">
          <input
            type="radio"
            value={DateOrderEnum.NewFirst}
            checked={props.order == DateOrderEnum.NewFirst}
            onChange={handleOptionChange}
            className="sort-input"
          />
          <span className="sort-custom-radio"></span>
          Newest
        </label>
      </div>
      <div className="sort-option">
        <label className="sort-label">
          <input
            type="radio"
            value={DateOrderEnum.OldFirst}
            checked={props.order == DateOrderEnum.OldFirst}
            onChange={handleOptionChange}
            className="sort-input"
          />
          <span className="sort-custom-radio"></span>
          Oldest
        </label>
      </div>
    </div>
  )
}

export default SortBar;
