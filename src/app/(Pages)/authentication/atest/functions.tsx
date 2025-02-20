// functions.tsx
export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
  
    // Get the day of the month with an ordinal suffix (e.g., 6th, 21st)
    const day = date.getDate();
    const ordinalSuffix = (day: any) => {
      const j = day % 10,
        k = day % 100;
      if (j === 1 && k !== 11) {
        return day + "st";
      } else if (j === 2 && k !== 12) {
        return day + "nd";
      } else if (j === 3 && k !== 13) {
        return day + "rd";
      } else {
        return day + "th";
      }
    };
  
    // Format the date into 'Weekday, Day Month Year - HH:mm AM/PM'
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  
    // Get the ordinal day
    const dayWithOrdinal = ordinalSuffix(day);
  
    // Replace the numeric day with the ordinal day in the formatted string
    return formattedDate.replace(date.getDate().toString(), dayWithOrdinal);
  };
  