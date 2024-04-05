import React from 'react';
import moment from 'moment';

import {formatDateTime} from '../../function/time';

const GraphBar = ({ checkInTime, breakTimes, checkOutTime }) => {
    // const currentTimeStamp = checkOutTime ? moment(checkOutTime) : moment();
    const currentTimeStamp = moment().set({ hour: 19, minute: 30 }); // for testing time complated

    // Calculate the total shift duration in minutes
    const shiftDuration = (9 * 60) + 30;

    const timeBar = [];
    const startTime = moment(checkInTime);
    const endTime = moment(startTime).add(shiftDuration, 'minutes');

    while (startTime <= endTime) {
        timeBar.push(
            <div key={startTime.format('hh:mm A')} className="hour">
                {startTime.format('hh:mm')}
            </div>
        );
        startTime.add(30, 'minutes');
    }

    // Calculate the elapsed time since check-in
    const elapsedTime = currentTimeStamp.diff(moment(checkInTime), 'minutes');

    // Calculate the progress percentage
    const progress = Math.min((elapsedTime / shiftDuration) * 100, 100);

    // Calculate the break durations and positions
    const breakDurations = breakTimes.map((breakTime) => ({
        start: moment(breakTime._in).diff(moment(checkInTime), 'minutes'),
        end: breakTime._out ? moment(breakTime._out).diff(moment(checkInTime), 'minutes') : currentTimeStamp.diff(moment(checkInTime), 'minutes'),
        duration: (breakTime._out ? moment(breakTime._out).diff(moment(checkInTime), 'minutes') : currentTimeStamp.diff(moment(checkInTime), 'minutes')) - moment(breakTime._in).diff(moment(checkInTime), 'minutes')
    }));

    const currentTime = {
        width: `${progress}%`,
    }
    const currentTime1 = {
        left: `${progress}%`,
    }

    // Format the times for display
    const formattedCheckInTime = moment(checkInTime).format('hh:mm A');
    const formattedBreakTimes = breakTimes.map((breakTime) => ({
        start: moment(breakTime._in).format('hh:mm A'),
        end: breakTime._out ? moment(breakTime._out).format('hh:mm A') : currentTimeStamp.format('hh:mm A'),
    }));

    const totalBreakDuration = breakDurations.reduce((total, breakDuration) => total + breakDuration.duration, 0);

    const allowedBreakDuration = 60; // Assuming the allowed break duration is 1 hour (60 minutes)

    // Calculate the extra break duration (in minutes)
    const extraBreakDuration = Math.max(totalBreakDuration - allowedBreakDuration, 0);
    const formattedExpectedCheckOutTime = moment(checkInTime).add(shiftDuration, 'minutes').add(extraBreakDuration, 'minutes').format('hh:mm A');

    const remainingTime = moment(formattedExpectedCheckOutTime, 'hh:mm A').diff(currentTimeStamp, 'minutes');
    const remainingHours = Math.floor(remainingTime / 60);
    const remainingMinutes = remainingTime % 60;

    let extraHours;
    let extraMinutes;

    if (remainingTime <= 0) {
        // Calculate extra time
        const extraTime = Math.abs(remainingTime); // Absolute value of remainingTime
        extraHours = Math.floor(extraTime / 60);
        extraMinutes = extraTime % 60;
    }

    const isCompleted = remainingTime <= 0;
    const progressClass = isCompleted ? 'custom_progress completed' : 'custom_progress';

    return (
        <div className={`daytime_widget`}>
            <div className={`daytime_label`}>
                <div>
                    <strong>In Time: </strong> <span>{formattedCheckInTime}</span>
                </div>
                <div>
                    <strong>Expected Out Time:</strong> <span>{formattedExpectedCheckOutTime}</span>
                </div>
                <div className={`daytime_break_label`}>
                    {formattedBreakTimes.map((breakTime, index) => (
                        <div key={index}>
                            <strong>Break {index + 1}:</strong> <span>{breakTime.start} - {breakTime.end}</span>
                        </div>
                    ))}
                </div>
                <div className={`daytime_break_label`}>
                    <strong>Extra Hour: </strong> <span>{extraHours} : {extraMinutes} hour</span>
                </div>
            </div>

            <div className={progressClass}>
                <div className={`current_stamp`} style={currentTime1}>{remainingHours + ' : ' + remainingMinutes} Hour Left</div>
                <div className={`fill_bar ${checkOutTime ? "done" : ""}`}>
                    <div className={`basic`}></div>
                    <div className={`fill`} style={currentTime}></div>
                    {breakDurations.map((breakDuration, index) => (
                        <div className={`break`}
                             key={index}
                             style={{
                                 left: `${((breakDuration.start / shiftDuration) * 100)}%`,
                                 right: `${(100 - (breakDuration.end / shiftDuration) * 100)}%`,
                             }}
                        >
                            {/*{formatDateTime.convertMinutesToHours(breakDuration.end - breakDuration.start)}*/}
                            {breakDuration.duration}
                        </div>
                    ))}

                </div>
                <div className={`number`}>
                    {timeBar}
                </div>
            </div>

        </div>
    );
};

export default GraphBar;