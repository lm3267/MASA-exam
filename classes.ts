import { classNames, firstNames, lastNames } from "./constants";
import { fullName, sortArray, calculateAge, getRandomBirthDate, getRandomValueFromArray } from "./helpers";
import { printSchool } from "./services";

export class School { 
    name: string;
    address: string;
    phone: string;
    classes: Classroom[] = [];

    constructor(name: string, address: string, phone: string, classes: Classroom[] = []) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        classes.length && (this.classes = classes);
        !classes.length && this.generateRandomSchool();
    }
    
    sortClasses() {
        this.classes = sortArray(this.classes, 'name');
    }

    addClass(cl: Classroom) {
        this.classes.push(cl);
        this.sortClasses();
    }

    printSchool() {
        printSchool(this);
    }

    generateRandomSchool() {
        let classNumber = Math.floor(Math.random() * 4) + 1
        for (let i = 0; i < classNumber; ++i) {
            let studentNumber = Math.floor(Math.random() * 30) + 1;
            let studentList : Student[] = [];
            for (let j = 0; j < studentNumber; ++j) {
                let student = new Student(getRandomValueFromArray(firstNames),  getRandomValueFromArray(lastNames), getRandomBirthDate());
                studentList.push(student);
            }
            let teacherSubjects = [];
            let subjectNumber = Math.floor(Math.random() * 3) + 1;  //Up to 3 classes
            for (let j = 0; j < subjectNumber; ++j) {
                teacherSubjects.push(getRandomValueFromArray(classNames));
            }
            let teacher = new Teacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), teacherSubjects);
            let classroom = new Classroom(teacherSubjects[0], teacher, studentList);
            classroom.sortNames();
            this.classes.push(classroom);
        }
        this.sortClasses();
    }

}

class Person {
    firstName: string;
    lastName: string;
    fullName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName(firstName, lastName);
    }
}

export class Teacher extends Person {
    constructor(firstName: string, lastName: string, public professions: string[]) {
        super(firstName, lastName);
    }

    addProfession(newProfession: string): void {
        this.professions.push(newProfession);
    }
}

export class Student extends Person {
    age: number;

    constructor(firstName: string, lastName: string, public birthDate: Date) {
        super(firstName, lastName);
        this.age = calculateAge(birthDate);
    }
}

export class Classroom {
    name: string;
    teacher: Teacher;
    students: Student[];

    constructor(name: string, teacher: Teacher, students: Student[]) {
        this.name = name;
        this.teacher = teacher;
        this.students = students;
    }

    sortNames() {
        this.students = sortArray(this.students, 'fullName');
    }

    addStudent(newStudent: Student) {
        this.students.push(newStudent);
        this.sortNames();
    }

    removeStudent(fullName: string): Student {
        let student = this.students.find(st => st.fullName === fullName);
        if (!student) throw `Student ${fullName} not found in this classroom`;
        let studentIndex = this.students.indexOf(student);
        this.students.splice(studentIndex, 1);
        return student;
    }

    getYoungestStudent(): Student {
        let youngestStudent = this.students[0];
        let minAge = youngestStudent.birthDate.toISOString();
        for (let i = 1; i < this.students.length; ++i) {
            if (this.students[i].birthDate.toISOString() < minAge) {
                youngestStudent = this.students[i];
                minAge = youngestStudent.birthDate.toISOString();
            }
        }
        return youngestStudent;
    }
}
