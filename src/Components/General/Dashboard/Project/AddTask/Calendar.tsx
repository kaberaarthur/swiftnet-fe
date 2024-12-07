import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (date: [Date | null, Date | null]) => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="border-dash-bottom" id="calendar">
      <ReactDatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
    </div>
  );
};

export default Calendar;
