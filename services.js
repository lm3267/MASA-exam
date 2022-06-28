"use strict";
// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
exports.__esModule = true;
exports.createSchool = exports.transferStudentWithClass = exports.transferStudent = exports.printSchool = exports.getClassYoungestStudent = exports.initializeSchool = void 0;
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
function initializeSchool() {
    var student1 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student2 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student3 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student4 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var teacher1 = createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), [constants_1.Mathematics]);
    var student5 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student6 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student7 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student8 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var teacher2 = createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), [constants_1.Geography]);
    var mathClass = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    var geographyClass = createClassroom("Geography", teacher1, [student5, student6, student7, student8]);
    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    };
}
exports.initializeSchool = initializeSchool;
function createTeacher(firstName, lastName, professions) {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: (0, helpers_1.fullName)(firstName, lastName)
    };
}
function createStudent(firstName, lastName, birthDate) {
    var age = (0, helpers_1.calculateAge)(birthDate);
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        fullName: (0, helpers_1.fullName)(firstName, lastName),
        age: age
    };
}
function createClassroom(name, teacher, students) {
    return {
        name: name,
        teacher: teacher,
        students: students
    };
}
function getClassYoungestStudent(classroom) {
    var youngestStudent = classroom.students[0];
    var minAge = youngestStudent.birthDate.toISOString();
    for (var i = 1; i < classroom.students.length; ++i) {
        if (classroom.students[i].birthDate.toISOString() < minAge) {
            youngestStudent = classroom.students[i];
            minAge = youngestStudent.birthDate.toISOString();
        }
    }
    return youngestStudent;
}
exports.getClassYoungestStudent = getClassYoungestStudent;
function printSchool(school) {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("\nClasses");
    console.log("============");
    school.classes.forEach(function (cl, i) {
        var classOutputString = "Class " + (i + 1).toString() + ": " + cl.name + "\n";
        classOutputString += "Teacher: " + cl.teacher.fullName + " " + cl.teacher.professions.join(', ') + "\n";
        classOutputString += "Students:\n";
        cl.students.forEach(function (st, i) {
            classOutputString += (i + 1).toString() + ": " + st.fullName + ": " + st.age + "\n";
        });
        classOutputString += "\n";
        console.log(classOutputString);
    });
}
exports.printSchool = printSchool;
function transferStudent(fullName, fromClassroom, toClassrom) {
    var student = fromClassroom.students.find(function (st) { return st.fullName === fullName; });
    if (!student)
        throw "Student ".concat(fullName, " not found in this classroom");
    var studentIndex = fromClassroom.students.indexOf(student);
    fromClassroom.students.splice(studentIndex, 1);
    toClassrom.students.push(student);
    toClassrom.students = (0, helpers_1.sortArray)(toClassrom.students, 'fullName'); //No need to sort the first class - it remains sorted
}
exports.transferStudent = transferStudent;
function transferStudentWithClass(fullName, fromClassroom, toClassrom) {
    var student = fromClassroom.removeStudent(fullName);
    toClassrom.addStudent(student);
}
exports.transferStudentWithClass = transferStudentWithClass;
function createSchool(name, address, phone, classNumber) {
    var classes = [];
    for (var i = 0; i < classNumber; ++i) {
        var studentNumber = Math.floor(Math.random() * 30) + 1;
        var studentList = [];
        for (var j = 0; j < studentNumber; ++j) {
            studentList.push(createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)()));
        }
        var teacherSubjects = [];
        var subjectNumber = Math.floor(Math.random() * 3) + 1; //Up to 3 classes
        for (var j = 0; j < subjectNumber; ++j) {
            teacherSubjects.push((0, helpers_1.getRandomValueFromArray)(constants_1.classNames));
        }
        studentList = (0, helpers_1.sortArray)(studentList, "fullName");
        var classroom = createClassroom(teacherSubjects[0], createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), teacherSubjects), studentList);
        classes.push(classroom);
    }
    classes = (0, helpers_1.sortArray)(classes, "name");
    return {
        name: name,
        address: address,
        phone: phone,
        classes: classes
    };
}
exports.createSchool = createSchool;
