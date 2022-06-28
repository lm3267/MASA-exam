"use strict";
exports.__esModule = true;
var services_1 = require("./services");
var classes_1 = require("./classes");
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
noClasses();
// withClasses();
function noClasses() {
    var school = (0, services_1.createSchool)("Name of School", "Address", "3176876686767", 3);
    (0, services_1.printSchool)(school); //Initial print
    school.classes.forEach(function (c) {
        console.log((0, services_1.getClassYoungestStudent)(c)); //print youngest of every class
    });
    (0, services_1.transferStudent)((0, helpers_1.fullName)((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames)), school.classes[0], school.classes[2]); //transfer one student from one class to another one
    (0, services_1.printSchool)(school);
}
function withClasses() {
    var school = new classes_1.School("Name of School", "Address", "3176876686767");
    school.printSchool();
    school.classes.forEach(function (c) {
        console.log(c.getYoungestStudent());
    });
    (0, services_1.transferStudentWithClass)((0, helpers_1.fullName)((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames)), school.classes[0], school.classes[2]);
    school.printSchool();
}
