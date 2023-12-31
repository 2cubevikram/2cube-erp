
export const calculateDuration = async (checkIn, checkOut) => {
    const duration = checkOut - checkIn; // Duration in milliseconds

    const hours = Math.floor(duration / 1000 / 60 / 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const seconds = Math.floor((duration / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};