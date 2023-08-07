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