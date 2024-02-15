export const formatDateTime = {
    getTime: function (time) {
        const dateObj = new Date(time);
        const tempTime = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        return tempTime;
    },
    getDate: function (time) {
        const dateObj = new Date(time);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Months are zero-based
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    },
    TimeDifference: function (time1, time2) {
        const date1 = new Date(time1);
        const date2 = new Date(time2);

        // Calculate the time difference in milliseconds
        const timeDiff = Math.abs(date2 - date1);

        // Convert milliseconds to minutes
        const minutes = Math.floor(timeDiff / (1000 * 60));

        // Convert minutes to hours and remaining minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Format the output
        const formattedOutput = `${hours}:${remainingMinutes.toString().padStart(2, '0')} Hours`;

        return formattedOutput;
    },
    calculateTotal: function (arr) {
        let totalBreakTime = 0;

        for (let i = 0; i < arr.length; i++) {
            const inTime = new Date(arr[i]._in);
            const outTime = new Date(arr[i]._out || arr[i]._in);
            const breakDuration = outTime - inTime;

            totalBreakTime += breakDuration;
        }

        // Convert break time to minutes
        const totalBreakMinutes = Math.floor(totalBreakTime / (1000 * 60));

        // Convert minutes to HH:MM format
        const hours = Math.floor(totalBreakMinutes / 60);
        const minutes = totalBreakMinutes % 60;

        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    },

    getCheckTimeToCurrentTime: function (inTime,serverTime) {
        const currentTime = new Date(serverTime);
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        const checkInTimeObj = new Date(inTime);
        const checkInHours = checkInTimeObj.getHours();
        const checkInMinutes = checkInTimeObj.getMinutes();

        let diffHours = currentHours - checkInHours;
        let diffMinutes = currentMinutes - checkInMinutes;

        // Adjust the difference if minutes are negative
        if (diffMinutes < 0) {
            diffHours--;
            diffMinutes += 60;
        }

        const hours = ("0" + diffHours).slice(-2);
        const minutes = ("0" + diffMinutes).slice(-2);
        const result = `${hours}:${minutes}`;

        return result;
    },
    getCheckTimeToComplateTime: function (inTime, outTime) {
        const currentTime = new Date(outTime);

        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        const checkInTimeObj = new Date(inTime);
        const checkInHours = checkInTimeObj.getHours();
        const checkInMinutes = checkInTimeObj.getMinutes();

        let diffHours = currentHours - checkInHours;
        let diffMinutes = currentMinutes - checkInMinutes;

        // Adjust the difference if minutes are negative
        if (diffMinutes < 0) {
            diffHours--;
            diffMinutes += 60;
        }

        const hours = ("0" + diffHours).slice(-2);
        const minutes = ("0" + diffMinutes).slice(-2);
        const result = `${hours}:${minutes}`;

        return result;
    },

    convertToMinutes: function (time) {
        // console.log({time})
        const [hours, minutes] = time.split(":");
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    },
    // 8:10
    convertToHour: function (hour) {
        // console.log({time})
        const [hours, minutes] = hour.split(":");
        return parseInt(60 * hours) + parseInt(minutes)
    },
    convertToHoursAndMinutes: function (minutes) {

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(remainingMinutes).padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}`;
    },
    convertMinutesToHours: function (minutes) {
        // var hours = Math.floor(minutes / 60);
        // var mins = minutes % 60;
        //
        // return hours + ":" + (mins < 10 ? "0" : "") + mins;

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);
        return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
    },

    formatTime:function (time)  {
        return new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
};

export const subtractTime = (totalTime, timeToSubtract) => {
    const regex = /(\d+):(\d+)/;
    const match = timeToSubtract.match(regex);

    if (match) {
        const hoursToSubtract = parseInt(match[1]);
        const minutesToSubtract = parseInt(match[2]);

        const date = new Date(0, 0, 0, totalTime, 0, 0);
        date.setHours(date.getHours() - hoursToSubtract);
        date.setMinutes(date.getMinutes() - minutesToSubtract);

        const remainingHours = date.getHours();
        const remainingMinutes = date.getMinutes();

        const remainingTime = `${remainingHours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
        return remainingTime;
    } else {
        return 'Invalid time format';
    }
};