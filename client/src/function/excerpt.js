import moment from "moment/moment";

export const excerpt = (str, maxLength = 15) => {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength)}...`;
}

export const getDayOfWeekInCurrentYear = (dateString) => {
    const birthDate = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const birthDateThisYear = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[birthDateThisYear.getDay()];
}

export const isBirthdayToday = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    return birthDate.getDate() === currentDate.getDate() && birthDate.getMonth() === currentDate.getMonth();
}




export const isBirthdayTomorrow = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return birthDate.getDate() === tomorrow.getDate() && birthDate.getMonth() === tomorrow.getMonth();
}

export const isThisWeek = (date) => {
    const startOfWeek = moment().startOf('isoWeek'); // Start of the week (Monday)
    const endOfWeek = moment().endOf('isoWeek');     // End of the week (Sunday)
    const momentDate = moment(date);
    return momentDate.isBetween(startOfWeek, endOfWeek, 'day', '[]');
}

export const isDateAfterToday = (date) => {
    return moment(date).isAfter(moment(), 'day');
}



export const isDateBeforeToday = (date) => {
    const isBefore = moment(date).isBefore(moment(), 'day');
    console.log(`Checking if ${date} is before today: ${isBefore}`);
    return isBefore;
}
