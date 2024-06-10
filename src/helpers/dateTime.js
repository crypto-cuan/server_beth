import moment from 'moment';

const calculateNewYorkMarketTime = (dateCoin, hourAnalytic) => {
    let isNewYorkMarketTime = false;
    let amPm = "am";
    let totalHour = hourAnalytic
    // start time and end time
    if (hourAnalytic >= 12) {
        totalHour = totalHour - 12
        amPm = "pm"
    } else {
        totalHour = "0" + String(totalHour)
    }
    var startTime = moment('00:00:00 am', 'HH:mm:ss a');
    // var endTime = moment(`${totalHour}:00:00 ${amPm}`, 'HH:mm:ss a');
    var endTime = moment('00:00:00 pm', 'HH:mm:ss a');

    // console.log("endTime: ", endTime);
    const dateCoinHour = dateCoin.hour();
    const startTimeHour = startTime.hour();
    const endTimeHour = endTime.hour();
    // console.log("dateCoinHour: ", dateCoinHour);
    // console.log("startTimeHour: ", startTimeHour);
    // console.log("endTimeHour: ", endTimeHour);
    if (dateCoinHour >= startTimeHour) {
        // console.log("open time");
    }
    if (dateCoinHour < endTimeHour) {
        // console.log("open time 2");
    }
    if (dateCoinHour >= startTimeHour && dateCoinHour < endTimeHour) {
        isNewYorkMarketTime = true
    }

    return isNewYorkMarketTime
}

export const convertTZ = (date, tzString) => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

export {
    calculateNewYorkMarketTime
}