/**
 Created by Guillaume Ferron on the 11/19/2017
 **/

/**
 * Gives the current year as a string
 *
 * @returns {string}
 */
export function getCurrentYear() {
    let date = new Date();
    let yearStr = "";

    yearStr += (date.getYear() + 1900);
    return yearStr;
}

/**
 * Gives the current month as a string
 *
 * @returns {string}
 */
export function getCurrentMonth() {
    let date = new Date();
    let monthStr = "";

    monthStr += (date.getYear() + 1900) + "-";
    monthStr += (date.getMonth() + 1);
    return monthStr;
}

/**
 * Gives the current day as a string
 *
 * @returns {string}
 */
export function getCurrentDay() {
    let date = new Date();
    let dayStr = "";

    dayStr += (date.getYear() + 1900) + "-";
    dayStr += (date.getMonth() + 1);
    dayStr += (date.getDay());

    return dayStr;
}

/**
 * Gives the date exactly one anterior month from today as a string
 *
 * @returns {string}
 */
export function getPassedMonth() {
    let date = new Date();
    let strDate;
    let month = date.getMonth();
    let year =(date.getYear() + 1900);

    if(month === 1) {
        month = 12;
        year -= 1;
    }
    else {
        month -= 1;
    }

    strDate = year + "-" + month + "-" + date.getDay() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

    return strDate;
}

/**
 * Convert a string date to an interger such that "2017-11-19-18-31-56" becomes 20171119183156
 *
 * @param date = the string date to convert to integer
 * @returns {Number}
 */
export function dateStrToInt(date) {
    let dateInt = "";
    date = date.split("-");

    for(let dateIndex = 0; dateIndex < date.length; dateIndex++) {
        dateInt += date[dateIndex];
    }

    return parseInt(dateInt);
}