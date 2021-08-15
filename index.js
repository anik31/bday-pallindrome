const dob = document.querySelector("#dob");
const btnCheck = document.querySelector("#btn-check");
const output = document.querySelector("#output");
const outputImg = document.querySelector("#output-img");

function strReverse(strVar){
    return strVar.split("").reverse().join("");
}

function checkPallindrome(strVar){
    return strVar == strReverse(strVar);
}

function dateToString(date){
    var newDate = {day : "", month : "", year : "" };
    if (date.day < 10){
        newDate.day = "0" + date.day;
    }
    else{
        newDate.day = date.day.toString();
    }
    if (date.month < 10){
        newDate.month = "0" + date.month;
    }
    else{
        newDate.month = date.month.toString();
    }
    newDate.year = date.year.toString();
    return newDate;
}

function dateVariations(date){
    var newDate = dateToString(date);
    var ddmmyyyy = newDate.day + newDate.month + newDate.year;
    var mmddyyyy = newDate.month + newDate.day + newDate.year;
    var yyyymmdd = newDate.year + newDate.month + newDate.day;
    var ddmmyy = newDate.day + newDate.month + newDate.year.slice(-2);
    var mmddyy = newDate.month + newDate.day + newDate.year.slice(-2);
    var yymmdd = newDate.year.slice(-2) + newDate.month + newDate.day;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPallindromeAllFormats(date){
    var dateFormats = dateVariations(date);
    var flag = false;
    for (var date of dateFormats){
        if(checkPallindrome(date)){
            flag = true;
            break;
        }
    }
    return flag;
}

function checkLeapYear(year){
    if (year % 400 == 0){
        return true;
    }
    else if(year % 100 == 0){
        return false;
    }
    else if(year % 4 == 0){
        return true;
    }
    else{
        return false;
    }
}

function getNextDate(date){
    var months = [31,28,31,30,31,30,31,31,30,31,30,31];
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    if(month === 2){
        if (checkLeapYear(year)){
            if(day > 29){
                day=1;
                month++;
            }
        } 
        else if(day > 28){
            day = 1;
            month++;
        }
    }
    else{
        if(day > months[month-1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }
    return {day : day, month : month, year : year}
}

function nextPallindrome(date){
    var nextDate = getNextDate(date);
    var count = 0;
    while(true){
        count++;
        if (checkPallindromeAllFormats(nextDate)){
            return {count,nextDate};
        }
        nextDate = getNextDate(nextDate);
    } 
}

function clickHandler(){
    if (dob.value != ""){
        var dateSplit = dob.value.split("-");
        var date = {
            day : Number(dateSplit[2]),
            month : Number(dateSplit[1]),
            year : Number(dateSplit[0])
        }
        if (checkPallindromeAllFormats(date)){
            output.innerText = "🥳 Yay!! Your bday is pallindrome 🥳";
            outputImg.src = "/images/happy.svg";
        }
        else{
            var nextPallindromeDate = nextPallindrome(date);
            output.innerText = `😐 Oops!! your bday is not pallindrome. The next pallindrome date is ${nextPallindromeDate.nextDate.day}-${nextPallindromeDate.nextDate.month}-${nextPallindromeDate.nextDate.year}. You missed it by ${nextPallindromeDate.count} days. 😐`
            outputImg.src = "/images/sad.svg";
        }
    }
    else{
        output.innerText = "Please enter your birthdate to continue.";
    }
}

btnCheck.addEventListener("click", clickHandler);
