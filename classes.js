"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Classroom = exports.Student = exports.Teacher = exports.School = void 0;
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
var services_1 = require("./services");
var School = /** @class */ (function () {
    function School(name, address, phone, classes) {
        if (classes === void 0) { classes = []; }
        this.classes = [];
        this.name = name;
        this.address = address;
        this.phone = phone;
        classes.length && (this.classes = classes);
        !classes.length && this.generateRandomSchool();
    }
    School.prototype.sortClasses = function () {
        this.classes = (0, helpers_1.sortArray)(this.classes, 'name');
    };
    School.prototype.addClass = function (cl) {
        this.classes.push(cl);
        this.sortClasses();
    };
    School.prototype.printSchool = function () {
        (0, services_1.printSchool)(this);
    };
    School.prototype.generateRandomSchool = function () {
        var classNumber = Math.floor(Math.random() * 4) + 1;
        for (var i = 0; i < classNumber; ++i) {
            var studentNumber = Math.floor(Math.random() * 30) + 1;
            var studentList = [];
            for (var j = 0; j < studentNumber; ++j) {
                var student = new Student((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
                studentList.push(student);
            }
            var teacherSubjects = [];
            var subjectNumber = Math.floor(Math.random() * 3) + 1; //Up to 3 classes
            for (var j = 0; j < subjectNumber; ++j) {
                teacherSubjects.push((0, helpers_1.getRandomValueFromArray)(constants_1.classNames));
            }
            var teacher = new Teacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), teacherSubjects);
            var classroom = new Classroom(teacherSubjects[0], teacher, studentList);
            classroom.sortNames();
            this.classes.push(classroom);
        }
        this.sortClasses();
    };
    return School;
}());
exports.School = School;
var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = (0, helpers_1.fullName)(firstName, lastName);
    }
    return Person;
}());
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(firstName, lastName, professions) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.professions = professions;
        return _this;
    }
    Teacher.prototype.addProfession = function (newProfession) {
        this.professions.push(newProfession);
    };
    return Teacher;
}(Person));
exports.Teacher = Teacher;
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(firstName, lastName, birthDate) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.birthDate = birthDate;
        _this.age = (0, helpers_1.calculateAge)(birthDate);
        return _this;
    }
    return Student;
}(Person));
exports.Student = Student;
var Classroom = /** @class */ (function () {
    function Classroom(name, teacher, students) {
        this.name = name;
        this.teacher = teacher;
        this.students = students;
    }
    Classroom.prototype.sortNames = function () {
        this.students = (0, helpers_1.sortArray)(this.students, 'fullName');
    };
    Classroom.prototype.addStudent = function (newStudent) {
        this.students.push(newStudent);
        this.sortNames();
    };
    Classroom.prototype.removeStudent = function (fullName) {
        var student = this.students.find(function (st) { return st.fullName === fullName; });
        if (!student)
            throw "Student ".concat(fullName, " not found in this classroom");
        var studentIndex = this.students.indexOf(student);
        this.students.splice(studentIndex, 1);
        return student;
    };
    Classroom.prototype.getYoungestStudent = function () {
        var youngestStudent = this.students[0];
        var minAge = youngestStudent.birthDate.toISOString();
        for (var i = 1; i < this.students.length; ++i) {
            if (this.students[i].birthDate.toISOString() < minAge) {
                youngestStudent = this.students[i];
                minAge = youngestStudent.birthDate.toISOString();
            }
        }
        return youngestStudent;
    };
    return Classroom;
}());
exports.Classroom = Classroom;
