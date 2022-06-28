"use strict";
exports.__esModule = true;
exports.sortArray = exports.calculateAge = exports.fullName = exports.getRandomBirthDate = exports.getRandomValueFromArray = void 0;
function getRandomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomValueFromArray = getRandomValueFromArray;
function getRandomBirthDate() {
    var year = 2011 - (Math.floor(Math.random() * 3));
    var month = Math.floor(Math.random() * 12);
    var day = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}
exports.getRandomBirthDate = getRandomBirthDate;
function fullName(firstName, lastName) {
    var returnString = lastName + " " + firstName;
    return returnString;
}
exports.fullName = fullName;
function calculateAge(birthDate) {
    var now = new Date();
    var age = now.getFullYear() - birthDate.getFullYear();
    if ((now.getMonth() < birthDate.getMonth()) || (now.getMonth() == birthDate.getMonth() && now.getDay() < birthDate.getDay()))
        age--;
    return age;
}
exports.calculateAge = calculateAge;
function sortArray(array, sortBy) {
    var sortedArray = [];
    for (var i = 0; i < array.length; i++) {
        var cur = array[i];
        if (sortedArray.length == 0) {
            sortedArray.push(cur);
        }
        else {
            var foundPosition = false;
            for (var j = 0; j < sortedArray.length; j++) {
                if (sortedArray[j][sortBy] < cur[sortBy]) {
                    sortedArray.splice(j, 0, cur);
                    foundPosition = true;
                    break;
                }
            }
            if (!foundPosition) {
                sortedArray.push(cur);
            }
        }
    }
    return sortedArray.reverse();
}
exports.sortArray = sortArray;
