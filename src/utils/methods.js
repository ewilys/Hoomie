/**
 Created by Guillaume Ferron on the 11/19/2017
 Modified by Lisa Martini since 01/15/2018
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

    dayStr += (date.getFullYear()) + "-";
    if(date.getMonth()+1<10){
        dayStr += '0';
    }
    dayStr += (date.getMonth() + 1)+"-";
    dayStr += (date.getDate());

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


/**
 * Convert a string date to an interger such that "2017-11-19" becomes 19 Nov. 2017
 *
 * @param date = the string date to convert to literal date
 * @returns {String}
 */
export function dateToLiteralString(date) {
    let literalDate = date.split("-")[2] + " ";
    switch(parseInt(date.split("-")[1])) {
        case 1:
            literalDate += "Jan. ";
            break;
        case 2:
            literalDate += "Feb. ";
            break;
        case 3:
            literalDate += "Mar. ";
            break;
        case 4:
            literalDate += "Apr. ";
            break;
        case 5:
            literalDate += "May ";
            break;
        case 6:
            literalDate += "Jun. ";
            break;
        case 7:
            literalDate += "Jul. ";
            break;
        case 8:
            literalDate += "Aug. ";
            break;
        case 9:
            literalDate += "Sep. ";
            break;
        case 10:
            literalDate += "Oct. ";
            break;
        case 11:
            literalDate += "Nov. ";
            break;
        case 12:
            literalDate += "Dec. ";
            break;
        default:
            return "N/A"
    }

    literalDate += date.split("-")[0];

    return literalDate;

}

/**
 * Convert the current month to a litteral string. Ex. : 08th month is August
 *
 * @returns {string}
 */
export function getCurrentMonthAsStr() {
    let monthStr = getCurrentMonth();
   return getMonthAsStr(monthStr);
}

export function getDayAsStr(date){
    date = date.split("-");

    var dateNb;
    if(date.length>2){
        dateNb = parseInt(date[2]);
    }
    else {
        dateNb = parseInt(date[0]);
    }


    switch(dateNb) {
        case 1:
            return dateNb+"st";
        case 2:
            return dateNb+"nd";
        case 3:
            return dateNb+"rd";
        case 21:
            return dateNb+"st";
        case 22:
            return dateNb+"nd";
        case 23:
            return dateNb+"rd";
        case 31:
            return dateNb+"st";
        default:
            return dateNb+"th";
    }
}
export function getMonthAsShortStr(monthStr) {
    //monthStr = year-month

    monthStr = monthStr.split("-");
    var monthNb;
    if(monthStr.length>1){
        monthNb = parseInt(monthStr[1]);
    }
    else{
        monthNb = parseInt(monthStr[0]);
    }

    console.log(monthNb);
    switch(monthNb) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
        default:
            return "N/A"
    }
}
export function getMonthAsStr(monthStr) {
    //monthStr = year-month
    monthStr = monthStr.split("-");

    let monthNb = parseInt(monthStr[1]);

    switch(monthNb) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "N/A"
    }
}
export function dateToString(date){
    var d = date.year+'-';
    if(date.month<10){
        d += '0';
    }
    d += date.month+'-';
    if(date.day<10){
        d += '0';
    }
    d += date.day;
    return d;
}