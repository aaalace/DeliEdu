import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

interface AutoCompleteProps {
  setSelectedDateTime: (dateTime: string) => void
}

const DateTimeAutoComplete = ({ setSelectedDateTime }: AutoCompleteProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      const formattedDateTime = date.toISOString();
      setSelectedDateTime(formattedDateTime);
    }
  };

  return (
    <div className="datetime-autocomplete">
      <div className="datetime-input-container">
        <label className="label-body" htmlFor="date-time-picker">Date and Time</label>
        <DatePicker
          id="date-time-picker"
          selected={startDate}
          onChange={handleChange}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
          timeFormat="HH:mm"
          className="input"
          timeCaption="Time"
        />
      </div>
    </div>
  );
};

export default DateTimeAutoComplete;
