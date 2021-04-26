export function addDays (date, daysToAdd) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + daysToAdd);
    return clone;
}

export function getWeek (forDate, daysOffset = 0) {
    const date = addDays(forDate, daysOffset);
    // Get the day index for the new date, for example, Tuesday = 2.
    const day = date.getDay();

    return {
        date,
        // For example, if it's Tuesday, shift back by 2 days.
        start: addDays(date, -day),
        // For example, if it's Tuesday, shift forward by 4 days.
        end: addDays(date, 6 - day)
    };
}
